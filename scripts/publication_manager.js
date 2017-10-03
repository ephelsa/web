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
var author = "";

firebase.auth().onAuthStateChanged(function(firebaseUser) {
  if(firebaseUser) {
    author = firebaseUser;
  } else {
    location.href = "login.html";
  }
});

// Get elements
var preview = document.getElementById('preview');

var txtNotice = document.getElementById('txtNotice');
var btnNewContent = document.getElementById('btnNewContent');  




// Buttons events
btnNewContent.addEventListener('click', async function(e) {
  var dbRefData = firebase.database()
    .ref()
    .child('data')
    .child('publications');  


  var time = new Date().getTime();  // Get the time
  var notice = txtNotice.value;  // Get the value of notice


  if (notice === "") {
    preview.innerHTML = "Please, write something...";

  } else {
    dbRefData.child(time).child('content').set(notice);  // Set the notice on firebase
    dbRefData.child(time).child('author').set(author.email);  // Set the author on firebase
    dbRefData.child(time).child('order').set(-time);  // Set the order. Is negative becase is ascend.
    dbRefData.child(time).child('uid').set(author.uid); // Set the UID.

    dbRefData.on('child_added', function(notice) {
      preview.innerHTML = notice.child('content').val();

      txtNotice.value = "";
    });
  }
});