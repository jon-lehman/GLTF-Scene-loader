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
        

        var savedCameraX = snapshot.child('cameraPosition/x').val().toString();
        var savedCameraY = snapshot.child('cameraPosition/y').val() - 1.6.toString();
        var savedCameraZ = snapshot.child('cameraPosition/z').val().toString();
        console.log('savedCameraX: ' + savedCameraX);
        console.log('savedCameraY: ' + savedCameraY);
        console.log('savedCameraZ: ' + savedCameraZ);
        var savedCameraPosition = savedCameraX + ' ' + savedCameraY + ' ' + savedCameraZ;
        console.log('savedCameraPosition: ' + savedCameraPosition);
        cameraRig.setAttribute('position', savedCameraPosition);
        
        // set rotation, but no pitch on touch devices
        var isTouchDevice = 'ontouchstart' in document.documentElement;
        if (isTouchDevice != true) {
          document.querySelector("a-camera").components["look-controls"].pitchObject.rotation.x = snapshot.child('cameraRotationPitch').val();
        }
        document.querySelector("a-camera").components["look-controls"].yawObject.rotation.y = snapshot.child('cameraRotationYaw').val();

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

// Trigger Tutorial on first visit
else {
  //set camera position and rotation if not saved environment
  document.querySelector("a-camera").components["look-controls"].pitchObject.rotation.x = -0.7560000000000002
  document.querySelector("a-camera").components["look-controls"].yawObject.rotation.y = 0.7940000000000004
  document.querySelector('a-camera').setAttribute('position', '2.1856205378251268, 5.235374808189253, 2.597413047666393');

  if (!localStorage.getItem("visted") && window.innerWidth > 960) {
    triggerTutorialModal();
  }
}
//Tutorial Modal
var tutorialSlider = document.getElementById('tutorial-slider');
var tutorialModalContentWidth = document.querySelector('#tutorial-modal .modal-content').offsetWidth + 60;

function triggerTutorialModal() {
  localStorage.setItem("visted",true);
  document.getElementById('tutorial-modal').setAttribute('style', 'display: flex');
}

function closeTutorial() {
  document.getElementById('tutorial-modal').setAttribute('style', 'display: none');
  tutorialSlider.setAttribute('style', 'transform: translateX(0px)');
}

function tutorialNavShowMeHow() {
  var tutorialModalContentWidth = document.querySelector('#tutorial-modal .modal-content').offsetWidth + 60;
  tutorialSlider.setAttribute('style', 'transform: translateX(-'+tutorialModalContentWidth+'px)');
}

function tutorialNavSlideOneNext() {
  var tutorialModalContentWidth = document.querySelector('#tutorial-modal .modal-content').offsetWidth + 60;
  tutorialSlider.setAttribute('style', 'transform: translateX(-'+tutorialModalContentWidth * 2+'px)');
}

function tutorialNavSlideTwoPrevious() {
  var tutorialModalContentWidth = document.querySelector('#tutorial-modal .modal-content').offsetWidth + 60;
  tutorialSlider.setAttribute('style', 'transform: translateX(-'+tutorialModalContentWidth+'px)');
}

function tutorialNavSlideTwoNext() {
  var tutorialModalContentWidth = document.querySelector('#tutorial-modal .modal-content').offsetWidth + 60;
  tutorialSlider.setAttribute('style', 'transform: translateX(-'+tutorialModalContentWidth * 3+'px)');
}

function tutorialNavSlideThreePrevious() {
  var tutorialModalContentWidth = document.querySelector('#tutorial-modal .modal-content').offsetWidth + 60;
  tutorialSlider.setAttribute('style', 'transform: translateX(-'+tutorialModalContentWidth * 2+'px)');
}

function tutorialNavSlideThreeNext() {
  var tutorialModalContentWidth = document.querySelector('#tutorial-modal .modal-content').offsetWidth + 60;
  tutorialSlider.setAttribute('style', 'transform: translateX(-'+tutorialModalContentWidth * 4 +'px)');
}

function tutorialNavSlideFourPrevious() {
  var tutorialModalContentWidth = document.querySelector('#tutorial-modal .modal-content').offsetWidth + 60;
  tutorialSlider.setAttribute('style', 'transform: translateX(-'+tutorialModalContentWidth * 3 +'px)');
}