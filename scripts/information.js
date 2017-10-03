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
firebase.auth().onAuthStateChanged(function(firebaseUser) {
  if(!firebaseUser) {
    location.href = "login.html";
  }
});



// Firebase References
var dbRefPublications = firebase.database()
  .ref()
  .child('data')
  .child('publications');
var topUserPostRef = dbRefPublications.orderByChild('order');


// Create elements  
var publication_container = document.createElement("DIV");
document.body.appendChild(publication_container);

// Parragraph List
topUserPostRef.on('child_added', function(publication) {
  const p = document.createElement("P");
  const post = document.createElement("LABEL");
  const author =document.createElement("LABEL");

  // Author attributes
  author.setAttribute("class", "author-tag");
  author.setAttribute("for", publication.key);

  p.appendChild(post);
  p.appendChild(author);
  publication_container.appendChild(p);

  p.id = publication.key;

  post.innerHTML = publication.child('content').val();
  author.innerHTML = "<b>Author: </b>" + "<i>" + publication.child('author').val() + "</i>";
});