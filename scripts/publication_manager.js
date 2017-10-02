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
    firebaseUser.providerData.forEach(function(profile) {
      author = profile.email;   // Get de author email for the moment
    });

  } else {
    location.href = "index.html";
  }
});


// Get elements
var preview = document.getElementById('preview');

var txtNotice = document.getElementById('txtNotice');
var btnNewContent = document.getElementById('btnNewContent');  

// Buttons events
btnNewContent.addEventListener('click', async function(e) {
  var dbRefData = firebase.database().ref().child('data');  // dbRefData

  var time = new Date().getTime();  // Get the time
  var notice = txtNotice.value;  // Get the value of notice


  if (notice === "") {
    preview.innerHTML = "Please, write something...";

  } else {
    dbRefData.child('author').child(time).set(author);  // Set the author on firebase
    dbRefData.child('publications').child(time).set(notice);  // Set the notice on firebase

    dbRefData.child('publications').on('child_added', function(dataSnap) {
      preview.innerHTML = dataSnap.val();

      txtNotice.value = "";
    });
  }
});