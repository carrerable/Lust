 // Initialize Firebase
    var config = {
       apiKey: "AIzaSyD5ibgCRodkSbHtMOGy1ctiXLhAyH9TqGE",
    authDomain: "lust-857fc.firebaseapp.com",
    projectId: "lust-857fc",
    storageBucket: "lust-857fc.appspot.com",
    messagingSenderId: "378032860215",
    appId: "1:378032860215:web:39861d9a528d79792263b2",
    measurementId: "G-2WYGS6J8F3"
    };
    /*************************/
    firebase.initializeApp(config);
  firebase.analytics();
    


    angular.module('Lust',['firebase']).controller('controlador', function($scope, $firebaseObject, $firebaseArray, $filter) {

    	console.log("Js principal funcionando correctamente")
    	$scope.provider = new firebase.auth.GoogleAuthProvider();
    	
    	firebase.auth().languageCode = 'es';

    

    	$scope.registrarUsuarioNuevo =  function(){
    		firebase.auth().createUserWithEmailAndPassword($scope.emailNuevoUsuario,$scope.passwordNuevoUsuario)
  .then((user) => {
    // Signed in
    // ...
    console.log("Signed in")
$scope.authStateListener(user);

   // window.location="cPanel.html";
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
    	}


    	$scope.iniciarSesion =  function(){

    		firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    // Signed in
    // ...
    $scope.authStateListener(user);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });

    	}

$scope.signOut =  function(){
  // [START auth_sign_out]
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
  // [END auth_sign_out]
}


$scope.authStateListener = function(user) {
  // [START auth_state_listener]
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      //Valores del usuario
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  // [END auth_state_listener]
}


$scope.googleRegistro = function (){
	console.log("Entro al registro de google ")

firebase.auth().signInWithPopup($scope.provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  console.log(token)
  var user = result.user;
  console.log(user)
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});

}


    })

