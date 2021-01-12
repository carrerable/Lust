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
   firebase.initializeApp(config);
   firebase.analytics();
   angular.module('modulo', ['firebase']).controller('controlador', function($scope, $firebaseObject, $firebaseArray, $filter) {

 /*Obtiene toda la informacion del nodo de perfiles de la firebase*/




 let list = [];
    const rootRefAnime = firebase.firestore().collection('Animes').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log("Cargo Animes")
        console.log(`${doc.id} => ${doc.data()}`);
                list.push(doc.data());
    });
     $scope.animesTablaPrincipal = list;
     console.log("Tabla animes cargada")
      console.log($scope.animesTablaPrincipal)
$scope.$apply();  
});



/*
     console.log(rootRefAnime)
    $scope.animesTablaPrincipal = $firebaseArray(rootRefAnime);
    $scope.animesTablaPrincipal.$loaded().then(function() {
      console.log("Tabla cargada con exito")
*/



      console.log("Js Principal Cargado con exito")
      var provider = new firebase.auth.GoogleAuthProvider();
      $scope.UsuarioLogueado = false;
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;
            $scope.UsuarioLogueado = true;
            $scope.$apply();
            console.log("Variable UsuarioLogueado : " + $scope.UsuarioLogueado)
            console.log("User id observador " + uid)
            console.log("El usuario esta loogueado")
            // ...
         } else {
            // User is signed out
            // ...
            console.log("Sin User id observador")
            console.log("El usuario no esta loogueado")
            $scope.UsuarioLogueado = false;
            $scope.$apply();
         }
      });
      $scope.registrarseGoogle = function() {
         firebase.auth().signInWithRedirect(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            alert("Inicio de sesion Correcto")
            console.log("Inicio de sesion de google correcto user : " + user)
            window.location.href = "index.html"
         }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            alert(errorMessage)
         });
      }
      $scope.registrarse = function() {
         if ($scope.correoRegistronuevo == "" || $scope.correoRegistronuevo == null || $scope.contraseniaRegistronuevo == "" || $scope.contraseniaRegistronuevo == null) {
            alert("No puedes tener los campos vacios")
         } else {
            console.log("Entro a funcion registrarse")
            console.log("El correo que se va a registrar es:" + $scope.correoRegistronuevo)
            console.log("El password que se va a registrar es:" + $scope.contraseniaRegistronuevo)
            firebase.auth().createUserWithEmailAndPassword($scope.correoRegistronuevo, $scope.contraseniaRegistronuevo).then((user) => {
               console.log(user)
               alert("Tu cuenta se ha creada correctamente")
               window.location.href = "index.html"
            }).catch((error) => {
               var errorCode = error.code;
               var errorMessage = error.message;
               alert(errorMessage)
               // ..
            });
         }
      }
      $scope.cerrarSesion = function() {
         firebase.auth().signOut().then(function() {
            $scope.UsuarioLogueado = false;
            alert("Cerraste sesion Correctamente")
            window.location.href = "index.html"
         }).catch(function(error) {
            alert(error)
         });
      }
      $scope.iniciarSesion = function() {
         firebase.auth().signInWithEmailAndPassword($scope.correoIniciarSesion, $scope.contraseniaIniciarSesion).then((user) => {
            alert("inicio de sesion exitoso")
            window.location.href = "index.html"
         }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
         });
      }




      $scope.borrarRegistroAnimes = function (id){
         console.log("Se eliminara :" + id)

         firebase.firestore().collection("Animes").doc("b32Y1yD4rl3csjsJ8DVJ").delete().then(function() {
    console.log("Registro Eliminado Correctamente!");
}).catch(function(error) {
    console.error("Error eliminando el registro : ", error);
});

      }
   })