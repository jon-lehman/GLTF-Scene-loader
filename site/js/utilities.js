// Device Motion Permission
//if (location.protocol != 'https:') {
// location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
//}
function requestDeviceMotionPerm () {
    document.getElementById('device-permission-modal').setAttribute("style", "display:none;");
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          document.getElementById('device-permission-modal').setAttribute("style", "display:none;");
          window.addEventListener('devicemotion', () => {});
        }
      })
      .catch(console.error);
  } else {
    // handle regular non iOS 13+ devices
  }
};

// Check toggle controls state on load and apply style
function checkToggles() {
  var controlToggles = document.querySelectorAll('input[type="checkbox"]');
  Array.prototype.forEach.call (controlToggles, function (controlToggle) {
    if(controlToggle.checked == true) {
      controlToggle.closest(".form-group").classList.add('focused');
      controlToggle.setAttribute('value', 'Enabled');
    } else{
      controlToggle.closest(".form-group").classList.remove('focused');
      controlToggle.setAttribute('value', 'Disabled');
    }
  })
}

// Check toggle controls state on change and apply style
function checkToggle(x) {
  if(document.getElementById(x).checked == true){
    document.getElementById(x).closest(".form-group").classList.add('focused');
    document.getElementById(x).setAttribute('value', 'Enabled');
  } else{
    document.getElementById(x).closest(".form-group").classList.remove('focused');
    document.getElementById(x).setAttribute('value', 'Disabled');
  }
};

// Change form group background on Active
function controlFocus(x) {
  document.getElementById(x).closest(".form-group").classList.add('focused');
}
function controlBlur(x) {
  document.getElementById(x).closest(".form-group").classList.remove('focused');
}

// Close modal functionality
// Close on icon click
function closeModalIcon(x) {
  document.getElementById(x).closest('.modal-overlay').setAttribute('style', 'display: none');
}
// close on overlay click
function closeModalOverlay(x) {
  if (!event.target.matches('.modal-overlay')) {return;}
  event.target.setAttribute('style', 'display: none;')
};

// Trigger environment name modal
function nameEnvironment() {
  document.querySelector('#name-modal').setAttribute('style', 'display: flex');
}