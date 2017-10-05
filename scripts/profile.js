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
    .child(fUser.uid);  

  updateProfile(txtName.value); // This is to update 

  // Set the information in the UID
  refUserInfo.child('name').set(txtName.value);
  refUserInfo.child('tel').set(txtTel.value);
  refUserInfo.child('cel').set(txtCel.value);

  clearForm();
});

function clearForm() {
  txtName.value = "";
  txtEmail.value = fUser.email;
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