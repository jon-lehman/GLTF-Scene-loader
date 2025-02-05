// TODO
// now that you're using an actual database, just get the position/rotation on save instead of using stupid inputs

var controlModelURL = document.getElementById('input-model-url');
var controlScaleMultiplier = document.getElementById('input-scale-multiplier');
var controlModelPosition = document.getElementById('input-model-position');
var controlFly = document.getElementById('toggle-fly');
var controlDummy = document.getElementById('toggle-dummy');
var controlGrid = document.getElementById('toggle-grid');
var controlFog = document.getElementById('toggle-fog');
var controlBackgroundColor = document.getElementById('input-background-color');
var controlSceneName = document.getElementById('input-environment-name')

var savedEnvironment = firebase.database().ref('savedEnvironments');

function saveEnvironment() {
  
  // Camera Position
  var cameraPosition = camera.getAttribute('position');
  
  // Camera Rotation
  /*
  var cameraRotation = camera.getAttribute('rotation');
  console.log('this is the raw .getAttribute rotation: ' + cameraRotation);
  var cameraRotation = JSON.stringify(cameraRotation).match(regex).map(function(v) { return parseFloat(v); });
  console.log('this is rotation with json.stringify and regex: ' + cameraRotation);
  var cameraRotation = cameraRotation.join(' ');
  console.log('this the rotation after join: ' + cameraRotation);
  */
  var cameraRotationPitch = document.querySelector("a-camera").components["look-controls"].pitchObject.rotation.x
  var cameraRotationYaw = document.querySelector("a-camera").components["look-controls"].yawObject.rotation.y
  
  // Control Values
  var modelURL = controlModelURL.value;
  var scaleMultiplier = controlScaleMultiplier.value;
  var modelPosition = controlModelPosition.value;
  var fly = controlFly.value;
  var dummy = controlDummy.value;
  var grid = controlGrid.value;
  var fog = controlFog.value;
  var backgroundColor = controlBackgroundColor.value;
  var sceneName = controlSceneName.value;
  
  sendSavedEnvironment(modelURL, scaleMultiplier, modelPosition, fly, dummy, grid, fog, backgroundColor, cameraPosition, cameraRotationPitch, cameraRotationYaw, sceneName);
};

function sendSavedEnvironment(modelURL, scaleMultiplier, modelPosition, fly, dummy, grid, fog, backgroundColor, cameraPosition, cameraRotationPitch, cameraRotationYaw, sceneName) {
  let newSavedEnvironment = savedEnvironment.push();
  newSavedEnvironment.set({
    modelURL: modelURL,
    scaleMultiplier: scaleMultiplier,
    modelPosition: modelPosition,
    fly: fly,
    dummy: dummy,
    grid: grid,
    fog: fog,
    backgroundColor: backgroundColor,
    cameraPosition: cameraPosition,
    cameraRotationPitch: cameraRotationPitch,
    cameraRotationYaw: cameraRotationYaw,
    sceneName: sceneName
  })
  
  var newSceneURL = "https://modelshare.app/?" + newSavedEnvironment.key;
  document.querySelector('#name-modal').setAttribute('style', 'display: none');
  document.querySelector('#complete-modal').setAttribute('style', 'display: flex');
  document.querySelector('#copy-url').innerHTML = newSceneURL;
  document.querySelector('#newSceneEnvironment');

  document.getElementById("icon-open-url").addEventListener('click',function () {
    window.open(newSceneURL); 
  });  
}