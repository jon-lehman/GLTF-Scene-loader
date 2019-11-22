// Does current URL contain "?"
var url = window.location.href
var isSavedUrl = url.includes("?");

// If url does contain "?"
if (isSavedUrl === true) {
  
  // Get saved scene name
  var savedUrlString = url.toString();
  var savedSceneName = savedUrlString.substring(savedUrlString.indexOf("?") + 1);
  
  var savedEnvironment = firebase.database().ref('savedEnvironments/' + savedSceneName);
  
  if (savedEnvironment == null) {
    alert("Environment could not be found.")
  } else {
    console.log("Yay! We found your saved environemnt");
    
      var changeEvent = new Event('change');

      savedEnvironment.on('value', function(snapshot) {
        document.querySelector('#input-environment-name').setAttribute('value', snapshot.child('sceneName').val());
        document.querySelector('#input-environment-name').dispatchEvent(changeEvent);

        document.querySelector('#input-model-url').setAttribute('value', snapshot.child('modelURL').val());
        document.querySelector('#input-model-url').dispatchEvent(changeEvent);

        document.querySelector('#input-scale-multiplier').setAttribute('value', snapshot.child('scaleMultiplier').val());
        document.querySelector('#input-scale-multiplier').dispatchEvent(changeEvent);

        document.querySelector('#input-model-position').setAttribute('value', snapshot.child('modelPosition').val());
        document.querySelector('#input-model-position').dispatchEvent(changeEvent);
        
        document.querySelector('#input-background-color').setAttribute('value', snapshot.child('backgroundColor').val());
        document.querySelector('#input-background-color').dispatchEvent(changeEvent);

        cameraRig.setAttribute('position', snapshot.child('cameraPosition').val());
        camera.setAttribute('position', '0 0 0');
        cameraRig.setAttribute('rotation', snapshot.child('cameraRotation').val());

        if (snapshot.child('fly').val() == "Enabled") {
          document.querySelector('#toggle-fly').checked = true;
          document.querySelector('#toggle-fly').dispatchEvent(changeEvent);
        } else {
          document.querySelector('#toggle-fly').checked = false;
          document.querySelector('#toggle-fly').dispatchEvent(changeEvent);
        }

        if (snapshot.child('dummy').val() == "Enabled") {
          document.querySelector('#toggle-dummy').checked = true;
          document.querySelector('#toggle-dummy').dispatchEvent(changeEvent);
        } else {
          document.querySelector('#toggle-dummy').checked = false;
          document.querySelector('#toggle-dummy').dispatchEvent(changeEvent);
        }

        if (snapshot.child('grid').val() == "Enabled") {
          document.querySelector('#toggle-grid').checked = true;
          document.querySelector('#toggle-grid').dispatchEvent(changeEvent);
        } else {
          document.querySelector('#toggle-grid').checked = false;
          document.querySelector('#toggle-grid').dispatchEvent(changeEvent);
        }

        if (snapshot.child('fog').val() == "Enabled") {
          document.querySelector('#toggle-fog').checked = true;
          document.querySelector('#toggle-fog').dispatchEvent(changeEvent);
        } else {
          document.querySelector('#toggle-fog').checked = false;
          document.querySelector('#toggle-fog').dispatchEvent(changeEvent);
        }
     });
  }
}