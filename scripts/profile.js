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
var user = "";

firebase.auth().onAuthStateChanged(function(firebaseUser) {

  if(firebaseUser) {
    firebaseUser.providerData.forEach(function(profile) {
      user = firebaseUser;   // Get the user
    });

  } else {
    location.href = "index.html";
  }
});
