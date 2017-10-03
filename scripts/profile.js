// Initialize Firebase
var config = {
  apiKey: "AIzaSyCv37cqPJfMVj7-07JuFY-s4wgccyveyXU",
  authDomain: "aprendizaje-web.firebaseapp.com",
  databaseURL: "https://aprendizaje-web.firebaseio.com",
  projectId: "aprendizaje-web",
  storageBucket: "",
  messagingSenderId: "412108039220"
};

// Firebase
firebase.initializeApp(config);

/*
  Realtime listener

  This is to verify the auth.
*/
var fUser = "";

firebase.auth().onAuthStateChanged(function(firebaseUser) {
  if(firebaseUser) {
    fUser = firebaseUser;
  } else {
    location.href = "login.html";
  }
});

// Get elements
var txtName = document.getElementById('txtName');
var txtEmail = document.getElementById('txtEmail');
var txtTel = document.getElementById('txtTel');
var txtCel = document.getElementById('txtCel');

var btnSubmmit = document.getElementById('btnSubmmit');


/*  Buttons events  */
btnSubmmit.addEventListener('click', async function(e) {
  // Firebase database Reference
  var refUserInfo = firebase.database()
    .ref()
    .child('users')
    .child('admin')
    .child(fUser.uid);  

  updateProfile(txtName.value);

  // Set the information in the UID
  refUserInfo.child('name').set(txtName.value);
  refUserInfo.child('tel').set(txtTel.value);
  refUserInfo.child('cel').set(txtCel.value);

  clearForm();
});

function clearForm() {
  txtName.value = "";
  txtEmail.value = "";
  txtTel.value = "";
  txtCel.value = "";
}

function updateProfile(name) {
  fUser.updateProfile({
    displayName: name
  }).then(function() {
    alert("Done!");

    updatePublisher();
  }, function(error) {
    alert(error);
  });
}

function updatePublisher() {
  var ref = firebase.database()
    .ref()
    .child('data')
    .child('publications');

  ref.on('value', async function(times) {
    times.forEach(function(snapshot) {
      if (snapshot.child('uid').val() == fUser.uid) {
        var timeRef = snapshot.key;

        ref.child(timeRef).child('author').set(fUser.displayName);
      }
    });
  });
}

function inputValidate(refUserInfo, key, input) {
  if (input.value == "") {
    return refUserInfo.child(key).val();
  } else {
    return input.value;
  }
}