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
    const ref = firebase.storage().ref('Animes/');
    let list = [];
    const rootRefAnime = firebase.firestore().collection('Animes').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log("Cargo Animes")
        console.log(`${doc.id} => ${doc.data()}`);
        var obj = doc.data()
        obj.id = doc.id;
        list.push(obj);
      });
      $scope.animesTablaPrincipal = list;
      console.log("Tabla animes cargada")
      console.log($scope.animesTablaPrincipal)
      $scope.$apply();
    });
    let list2 = [];
    const rootRefGenero = firebase.firestore().collection('Generos').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log("Cargo Generos")
        console.log(`${doc.id} => ${doc.data()}`);
        var obj = doc.data()
        obj.id = doc.id;
        list2.push(obj);
      });
      $scope.generosTablaPrincipal = list2;
      console.log("Tabla Generos cargada")
      console.log($scope.generosTablaPrincipal)
      $scope.$apply();
    });
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
        if (window.location.pathname == "/Lust/iniciarSesion.html" || window.location.pathname == "/C:/Users/CBLE/Documents/GitHub/Lust/iniciarSesion.html") {
          window.location.href = "index.html"
        }
        if (window.location.pathname == "/Lust/registro.html" || window.location.pathname == "/C:/Users/CBLE/Documents/GitHub/Lust/registro.html") {
          window.location.href = "index.html"
        }
        // ...
      } else {
        // User is signed out
        // ...
        console.log(window.location.href)
        console.log(window.location.hostname)
        console.log(window.location.pathname)
        console.log(window.location.protocol)
        if (window.location.pathname == "/Lust/cPanel.html" || window.location.pathname == "/C:/Users/CBLE/Documents/GitHub/Lust/cPanel.html") {
          window.location.href = "index.html"
        }
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
    $scope.borrarRegistroAnimes = function(id) {
      console.log("Se eliminara :" + id)
      firebase.firestore().collection("Animes").doc(id).delete().then(function() {
        console.log("Registro Eliminado Correctamente!");
        location.reload();
      }).catch(function(error) {
        console.error("Error eliminando el registro : ", error);
      });
    }
    $scope.agregarAnimeNuevo = function() {
      if ($scope.nombreAnimeNuevo == "" || $scope.nombreAnimeNuevo == null) {
        alert("El nombre del anime no puede estar vacio")
      } else if ($scope.generoAnimeNuevo == "" || $scope.generoAnimeNuevo == null) {
        alert("El genero del anime no puede estar vacio")
      } else if ($scope.creadorAnimeNuevo == "" || $scope.creadorAnimeNuevo == null) {
        alert("El nombre del creador del anime no puede estar vacio")
      }
      if ($scope.animesTablaPrincipal.length == 0) {
        var doc = 0
        doc = doc.toString()
      } else {
        var doc = $scope.animesTablaPrincipal.length + 1
        doc = doc.toString()
      }
      console.log(doc);
      if ($scope.UrlDeimagensubida == null || $scope.UrlDeimagensubida == "") {
        alert("Tienes que ingresar una imagen antes de guardar un nuevo anime")
      } else {
        var d = new Date();
        var n = d.getDate()
        var y = d.getFullYear()
        var p = d.getMonth() + 1;
        var fecha = n + "-" + p + "-" + y;
        firebase.firestore().collection("Animes").doc($scope.nombreAnimeNuevo).set({
          Nombre: $scope.nombreAnimeNuevo,
          Genero: $scope.generoAnimeNuevo,
          Creador: $scope.creadorAnimeNuevo,
          UrlImagen: $scope.UrlDeimagensubida,
          Fecha: fecha,
        }).then(function() {
          console.log("Document successfully written!");
          alert("Se guardo el registro de forma exitosa")
          $scope.nombreAnimeNuevo = "";
          $scope.generoAnimeNuevo = "";
          $scope.creadorAnimeNuevo = "";
          $scope.UrlDeimagensubida = "";
          location.reload();
        }).catch(function(error) {
          console.error("Error writing document: ", error);
          alert("Error al intentar guarda registro nuevo")
        });
      }
    }
    $scope.actualizarAnime = function() {
      var AnimeaActualizar = firebase.firestore().collection("Animes").doc($scope.animeaActualizar.id);
      console.log($scope.animeaActualizar)
      // Set the "capital" field of the city 'DC'
      return AnimeaActualizar.update({
        Nombre: $scope.animeaActualizar.Nombre,
        Creador: $scope.animeaActualizar.Creador,
        Genero: $scope.animeaActualizar.Genero
      }).then(function() {
        console.log("Document successfully updated!");
        alert("Registro editado con exito")
        location.reload();
      }).catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
    }
    $scope.actualizarRegistroAnimes = function(id) {
      $scope.animeaActualizar1 = firebase.firestore().collection("Animes").doc(id);
      $scope.animeaActualizar1.get().then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          $scope.animeaActualizar = doc.data()
          $scope.animeaActualizar.id = id;
          console.log($scope.animeaActualizar)
          $scope.$apply();
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
    }
    $scope.subirArchivoAnime = function() {
      const file = document.querySelector('#inputGroupFile02').files[0];
      const name = file.name
      if (name == "" || name == null) {
        alert("Primero tiene que seleccionar un archivo")
      } else {
        const metadata = {
          contentType: file.type
        }
        if ($scope.nombreAnimeNuevo == "" || $scope.nombreAnimeNuevo == null) {
          alert("Necesitas agregar un nombre al anime para poder subir una foto")
        } else {
          // Upload file and metadata to the object 'images/mountains.jpg'
          var uploadTask = ref.child($scope.nombreAnimeNuevo + '/' + file.name).put(file, metadata);
          // Listen for state changes, errors, and completion of the upload.
          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function(snapshot) {

var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}



              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              move()
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                  console.log('Upload is paused');
                  break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                  console.log('Upload is running');
                  break;
              }
            },
            function(error) {
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
                case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  break;
                case 'storage/canceled':
                  // User canceled the upload
                  break;
                case 'storage/unknown':
                  // Unknown error occurred, inspect error.serverResponse
                  break;
              }
            },
            function() {
              // Upload completed successfully, now we can get the download URL
              uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);
                $scope.UrlDeimagensubida = downloadURL;
                const imagenElement = document.querySelector("#Prueba");
                imagenElement.src = downloadURL;
              });
            });
        }
      }
    }
    $scope.agregarGeneroNuevo = function() {
      var d = new Date();
      var n = d.getDate()
      var y = d.getFullYear()
      var p = d.getMonth() + 1;
      var fecha = n + "/" + p + "/" + y;
      if ($scope.nombreGeneroNuevo == "" || $scope.nombreGeneroNuevo == null) {
        alert("El nombre del genero no puede estar vacio")
      }
      if ($scope.nombreGeneroNuevo.length == 0) {
        var doc = 0
        doc = doc.toString()
      } else {
        var doc = $scope.nombreGeneroNuevo.length + 1
        doc = doc.toString()
      }
      console.log(doc);
      firebase.firestore().collection("Generos").add({
        Genero: $scope.nombreGeneroNuevo,
        Fecha: fecha,
      }).then(function() {
        console.log("Document successfully written!");
        alert("Se guardo el registro de forma exitosa")
        $scope.nombreGeneroNuevo = "";
        location.reload();
      }).catch(function(error) {
        console.error("Error writing document: ", error);
        alert("Error al intentar guarda registro nuevo")
      });
    }
    $scope.borrarRegistroGenero = function(id) {
      console.log("Se eliminara :" + id)
      firebase.firestore().collection("Generos").doc(id).delete().then(function() {
        console.log("Registro Eliminado Correctamente!");
        location.reload();
      }).catch(function(error) {
        console.error("Error eliminando el registro : ", error);
      });
    }
    $scope.actualizarRegistroGenero = function(id) {
      $scope.generoaActualizar = firebase.firestore().collection("Generos").doc(id);
      $scope.generoaActualizar.get().then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          $scope.generoaActualizar = doc.data()
          $scope.generoaActualizar.id = id;
          console.log($scope.generoaActualizar)
          $scope.$apply();
        } else {
          console.log("No such document!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
    }
    $scope.actualizarGenero = function() {
      var AnimeaActualizar = firebase.firestore().collection("Generos").doc($scope.generoaActualizar.id);
      console.log($scope.animeaActualizar)
      return AnimeaActualizar.update({
        Genero: $scope.generoaActualizar.Genero,
      }).then(function() {
        console.log("Document successfully updated!");
        alert("Registro editado con exito")
        location.reload();
      }).catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
    }
   });