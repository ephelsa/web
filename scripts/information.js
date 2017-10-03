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
var dbRefNotice = dbRefObject.child('publications');
var dbRefAuthor = dbRefObject.child('author');

// Create elements  
var publication_container = document.createElement("DIV");
document.body.appendChild(publication_container);

/*
  Realtime listener

  This is to verify the auth.
*/
firebase.auth().onAuthStateChanged(function(firebaseUser) {
  if(!firebaseUser) {
    location.href = "login.html";
  }
});

// Parragraph List
dbRefNotice.on('child_added', function(dataSnap) {
  const p = document.createElement("P");

  const notice = document.createElement("LABEL");
  
  notice.innerHTML = dataSnap.val();
  p.id = dataSnap.key;

  p.appendChild(notice);
  publication_container.appendChild(p);
});

dbRefAuthor.on('child_added', function(dataSnap) {
  const p = document.getElementById(dataSnap.key);

  const author =document.createElement("LABEL");

  author.setAttribute("class", "author-tag");
  author.setAttribute("for", dataSnap.key);

  author.innerHTML = "<b>Author: </b>" + "<i>" + dataSnap.val() + "</i>";

  p.appendChild(author);
});