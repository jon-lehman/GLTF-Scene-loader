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
  
  var cameraPosition = new THREE.Vector3();
  cameraPosition.setFromMatrixPosition(camera.object3D.matrixWorld);
  var cameraPosition = JSON.stringify(cameraPosition).match(regex).map(function(v) { return parseFloat(v); });
  var cameraPosition = cameraPosition.join(' ');
  
  var cameraRotation = camera.getAttribute('rotation');
  var cameraRotation = JSON.stringify(cameraRotation).match(regex).map(function(v) { return parseFloat(v); });
  var cameraRotation = cameraRotation.join(' ');
  
  var modelURL = controlModelURL.value;
  var scaleMultiplier = controlScaleMultiplier.value;
  var modelPosition = controlModelPosition.value;
  var fly = controlFly.value;
  var dummy = controlDummy.value;
  var grid = controlGrid.value;
  var fog = controlFog.value;
  var backgroundColor = controlBackgroundColor.value;
  var sceneName = controlSceneName.value;
  
  sendSavedEnvironment(modelURL, scaleMultiplier, modelPosition, fly, dummy, grid, fog, backgroundColor, cameraPosition, cameraRotation, sceneName);
};

function sendSavedEnvironment(modelURL, scaleMultiplier, modelPosition, fly, dummy, grid, fog, backgroundColor, cameraPosition, cameraRotation, sceneName) {
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
    cameraRotation: cameraRotation,
    sceneName: sceneName
  })
  
  var newSceneURL = "https://modelshare-firebase.glitch.me/?" + newSavedEnvironment.key;
  document.querySelector('#name-modal').setAttribute('style', 'display: none');
  document.querySelector('#complete-modal').setAttribute('style', 'display: flex');
  document.querySelector('#copy-url').innerHTML = newSceneURL;
  document.querySelector('#newSceneEnvironment');
  
}