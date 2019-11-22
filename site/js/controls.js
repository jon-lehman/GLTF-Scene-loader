// Model URL, Scale Multiplier, Model Position
AFRAME.registerComponent('model', {
  init: function () {

    // GLTF URL Input Control
    var inputUrl = document.querySelector('#input-model-url');
    inputUrl.addEventListener('change', (event) => {
      var inputUrlVal = inputUrl.value;
      this.el.setAttribute('gltf-model', inputUrlVal);
    })

    // Model Scale Multiplier Input Control
    var inputScale = document.querySelector('#input-scale-multiplier');
    inputScale.addEventListener('change', (event) => {
      var inputScaleVal = inputScale.value;
      this.el.setAttribute('scale', {x: inputScaleVal, y: inputScaleVal, z: inputScaleVal});
    })

    // Model Position Input Control
    var inputModelPosition = document.querySelector('#input-model-position');
    inputModelPosition.addEventListener('change', (event) => {
      var inputModelPositionVal = inputModelPosition.value;
      this.el.object3D.position.y = inputModelPositionVal;
    })
  }
});   

// Background Color, and fog
AFRAME.registerComponent('scene', {
  init: function () {

    // Background Color Input Control
    var inputBackgroundColor = document.querySelector('#input-background-color');
    inputBackgroundColor.addEventListener('change', (event) => {
      var inputBackgroundColorVal = inputBackgroundColor.value;
      this.el.setAttribute('background', 'color:' + inputBackgroundColorVal);
      this.el.setAttribute('fog', 'color', inputBackgroundColorVal)
    });

    var inputToggleFog = document.querySelector('#toggle-fog');
    inputToggleFog.addEventListener('change', (event) => {
      if (inputToggleFog.checked == true) {
        this.el.setAttribute('fog', 'density', '.06');
      } else {
        this.el.setAttribute('fog', 'density', '0');
      }
    })
  }
});

// Fly mode for WASD, and setting camera position
AFRAME.registerComponent('camera-tracker', {

  // Toggle Fly Mode Input Control (for keyboard)
  init: function () {
    var inputToggleFly = document.querySelector('#toggle-fly');
    inputToggleFly.addEventListener('change', (event) => {
      if (inputToggleFly.checked == true) {
        this.el.setAttribute('wasd-controls',"fly: true; acceleration: 300");
      } else {
        this.el.setAttribute('wasd-controls',"fly: false; acceleration: 80");
      }
    })
  }
});

// Fly Mode for Mobile
AFRAME.registerComponent('camera-rig', {

  // Toggle Fly Mode Input Control (for touch)
  init: function () {
    var inputToggleFly = document.querySelector('#toggle-fly');
    inputToggleFly.addEventListener('change', (event) => {
      if (inputToggleFly.checked == true) {
        this.el.setAttribute('movement-controls',"controls: touch; fly: true; speed:0.3");
      } else {
        this.el.setAttribute('movement-controls',"controls: touch; fly: false; speed:0.05");
        camera.object3D.position.y = 1.6;
        this.el.object3D.position.y = 0;
      }
    })
  },
  
  //=========
  // Getting Camera Position/Rotation, inserting inputs, listening for saved position
  //=========
  tick: function () {
    var regex = /[+-]?\d+(\.\d+)?/g;    

    // Getting usable current position data
    var currentCameraPosition = this.el.object3D.position
    var currentCameraPositionArray = JSON.stringify(currentCameraPosition).match(regex).map(function(v) { return parseFloat(v); });
    var currentCameraPositionVector = currentCameraPositionArray.join(' ');

    // Define hidden position input
    var inputCameraPosition = document.querySelector("#input-camera-position");

    // setting defined input to currentCameraPositionVector
    inputCameraPosition.setAttribute('value', currentCameraPositionVector);

    // Listen for saved position
    document.querySelector('#saved-camera-position').addEventListener('change', (event) => {
      this.el.setAttribute('position', document.querySelector('#saved-camera-position').value);
    })
    
    // Getting usable current rotation data
    var currentCameraRotation = this.el.object3D.rotation
    var currentCameraRotationArray = JSON.stringify(currentCameraRotation).match(regex).map(function(v) { return parseFloat(v); });
    var currentCameraRotationVector = currentCameraRotationArray.join(' ');
    
    console.log("current: " + currentCameraRotationVector);
    
    // Define hidden rotation input
    var inputCameraRotation = document.querySelector("#input-camera-rotation");

    // setting defined input to currentCameraRotationVector
    inputCameraRotation.setAttribute('value', currentCameraRotationVector);
  },
  init: function () {
    // Listen for saved rotation
    document.querySelector('#saved-camera-rotation').addEventListener('change', (event) => {
      var savedCameraRotation = document.querySelector('#saved-camera-rotation').value
      this.el.setAttribute('rotation', savedCameraRotation);
      
      console.log('saved: ' + document.querySelector('#saved-camera-rotation').value)
    })
  }
});

// Dummy
AFRAME.registerComponent('dummy', {
  init: function () {
    // Toggle Dummy Input Control
    var inputToggleDummy = document.querySelector('#toggle-dummy');
    inputToggleDummy.addEventListener('change', (event) => {
      if (inputToggleDummy.checked == true) {
        this.el.setAttribute('visible', 'true');
      } else {
        this.el.setAttribute('visible', 'false');
      }
    })
  }
});

// Grid
AFRAME.registerComponent('grid', {
  init: function () {
    // Toggle Grid Input Control
    var inputToggleGrid = document.querySelector('#toggle-grid');
    inputToggleGrid.addEventListener('change', (event) => {
      if (inputToggleGrid.checked == true) {
        this.el.setAttribute('visible', 'true');
      } else {
        this.el.setAttribute('visible', 'false');
      }
    })
  }
}); 