(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCv37cqPJfMVj7-07JuFY-s4wgccyveyXU",
    authDomain: "aprendizaje-web.firebaseapp.com",
    databaseURL: "https://aprendizaje-web.firebaseio.com",
    projectId: "aprendizaje-web",
    storageBucket: "",
    messagingSenderId: "412108039220"
  };
  
  firebase.initializeApp(config);

  const emailProvider = "@udea.edu.co";

  // Get Elements
  const txtEmail = document.getElementById('txtEmail');
  const txtPass = document.getElementById('txtPass');

  const btnLogin = document.getElementById('btnLogin');

  // Add Login event
  btnLogin.addEventListener('click', e => {
    const email = txtEmail.value + emailProvider;
    const pass = txtPass.value;
    const auth = firebase.auth();

    // Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => alert(e.message));
  });

  // Add realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser);

      location.href = "information.html";
    }
  });

}());