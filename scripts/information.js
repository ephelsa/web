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

// Firebase References
var dbRefObject = firebase.database().ref().child('data');
var dbRefList = dbRefObject.child('publications');


// Create elements  
var publication_container = document.createElement("DIV");
document.body.appendChild(publication_container);

// Variables
var time = new Date().getTime() / 1000;

/*
  Realtime listener

  This is to verify the auth.
*/
firebase.auth().onAuthStateChanged(function(firebaseUser) {
  if(!firebaseUser) {
    location.href = "index.html";
  }
});

// Parragraph List
dbRefList.on('child_added', function(dataSnap) {
  const p = document.createElement('p');
  p.innerText = dataSnap.val();
  p.id = dataSnap.key;

  publication_container.appendChild(p);
});