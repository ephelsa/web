// Get Elements
const txtEmail = document.getElementById('txtEmail');
const txtPass = document.getElementById('txtPass');
const btnLogin = document.getElementById('btnLogin');

// Variables
const emailProvider = "@udea.edu.co";

// Add realtime listener
firebase.auth().onAuthStateChanged(function(firebaseUser) {
  if(firebaseUser) {
    location.href = "post.html";
  }
});

// Add Login event
btnLogin.addEventListener('click', function(e) {
  const email = txtEmail.value + emailProvider;
  const pass = txtPass.value;
  const auth = firebase.auth();

  // Sign in
  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(function(e) { alert(e.message) });
});