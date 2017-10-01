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

  const btnLogout = document.getElementById('btnLogout');


  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
  });

  // Add realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser);
    } else {
      location.href = "index.html";
    }
  });

}());