'use strict';

angular.module('webrtcAppApp')
  .controller('SpeakCtrl', function ($scope,$http) {

console.log(meSpeak);

//meSpeak is initiated variable for mespeak class from mespeak.js
meSpeak.loadConfig('assets/mespeak/mespeak_config.json');

//json call for callback data check
$http.get('assets/mespeak/mespeak_config.json').success(function(data){
  console.log(data);
 });

//load voice json file library
meSpeak.loadVoice("assets/mespeak/voices/en/en.json");

var parts = [
  { text: "Travel to",      voice: "en/en", variant: "m3" },
  // { text: "Paris",          voice: "fr",    variant: "f5" },
  { text: "at light speed", voice: "en/en", variant: "m3" }
];

$scope.speakIt = function () {
  // called by button
  meSpeak.speakMultipart(parts);
};

});
