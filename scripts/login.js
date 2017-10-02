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


// Get Elements
const txtEmail = document.getElementById('txtEmail');
const txtPass = document.getElementById('txtPass');
const btnLogin = document.getElementById('btnLogin');

// Variables
const emailProvider = "@udea.edu.co";


// Add realtime listener
firebase.auth().onAuthStateChanged(function(firebaseUser) {
  if(firebaseUser) {
    console.log(firebaseUser);

    location.href = "information.html";
  }
});

// Add Login event
btnLogin.addEventListener('click', function(e) {
  const email = txtEmail.value + emailProvider;
  const pass = txtPass.value;
  const auth = firebase.auth();

  // Sign in
  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(e => alert(e.message));
});