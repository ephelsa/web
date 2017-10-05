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
var fUser = "...";

firebase.auth().onAuthStateChanged(function(firebaseUser) {
	const loginPath = "/home/leonardo/Documentos/Estructura/Web/pages/login.html";
	
	if(!firebaseUser && location.pathname != loginPath) {
		location.href = "login.html";
 	} else {
    	fUser = firebaseUser;
 	}
});