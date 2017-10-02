(function () {
  
  // Get elements  
  var btnLogout = document.getElementById('btnLogout');
  var div_container = document.getElementById('p_container');


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

  // Variables
  var time = new Date().getTime() / 1000;

  // Log out button
  btnLogout.addEventListener('click', function(e) {
    firebase.auth().signOut();
  });

  // Add realtime listener
  firebase.auth().onAuthStateChanged(function(firebaseUser) {
    if(firebaseUser) {
      // Here is the next page.
    } else {
      location.href = "index.html";
    }
  });


  // Parragraph List
  dbRefList.on('child_added', function(snap) {
    const p = document.createElement('p');
    p.innerText = snap.val();
    p.id = snap.key;

    div_container.appendChild(p);
  });

}());