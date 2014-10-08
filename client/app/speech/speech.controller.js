'use strict';

angular.module('webrtcAppApp')
  .controller('SpeechCtrl', function ($scope) {

var langs 			 =
			[['Afrikaans',       ['af-ZA']],
			 ['Bahasa Indonesia',['id-ID']],
			 ['Bahasa Melayu',   ['ms-MY']],
			 ['Català',          ['ca-ES']],
			 ['Čeština',         ['cs-CZ']],
			 ['Deutsch',         ['de-DE']],
			 ['English',         ['en-AU', 'Australia'],
			                     ['en-CA', 'Canada'],
			                     ['en-IN', 'India'],
			                     ['en-NZ', 'New Zealand'],
			                     ['en-ZA', 'South Africa'],
			                     ['en-GB', 'United Kingdom'],
			                     ['en-US', 'United States']],
			 ['Español',         ['es-AR', 'Argentina'],
			                     ['es-BO', 'Bolivia'],
			                     ['es-CL', 'Chile'],
			                     ['es-CO', 'Colombia'],
			                     ['es-CR', 'Costa Rica'],
			                     ['es-EC', 'Ecuador'],
			                     ['es-SV', 'El Salvador'],
			                     ['es-ES', 'España'],
			                     ['es-US', 'Estados Unidos'],
			                     ['es-GT', 'Guatemala'],
			                     ['es-HN', 'Honduras'],
			                     ['es-MX', 'México'],
			                     ['es-NI', 'Nicaragua'],
			                     ['es-PA', 'Panamá'],
			                     ['es-PY', 'Paraguay'],
			                     ['es-PE', 'Perú'],
			                     ['es-PR', 'Puerto Rico'],
			                     ['es-DO', 'República Dominicana'],
			                     ['es-UY', 'Uruguay'],
			                     ['es-VE', 'Venezuela']],
			 ['Euskara',         ['eu-ES']],
			 ['Français',        ['fr-FR']],
			 ['Galego',          ['gl-ES']],
			 ['Hrvatski',        ['hr_HR']],
			 ['IsiZulu',         ['zu-ZA']],
			 ['Íslenska',        ['is-IS']],
			 ['Italiano',        ['it-IT', 'Italia'],
			                     ['it-CH', 'Svizzera']],
			 ['Magyar',          ['hu-HU']],
			 ['Nederlands',      ['nl-NL']],
			 ['Norsk bokmål',    ['nb-NO']],
			 ['Polski',          ['pl-PL']],
			 ['Português',       ['pt-BR', 'Brasil'],
			                     ['pt-PT', 'Portugal']],
			 ['Română',          ['ro-RO']],
			 ['Slovenčina',      ['sk-SK']],
			 ['Suomi',           ['fi-FI']],
			 ['Svenska',         ['sv-SE']],
			 ['Türkçe',          ['tr-TR']],
			 ['български',       ['bg-BG']],
			 ['Pусский',         ['ru-RU']],
			 ['Српски',          ['sr-RS']],
			 ['한국어',            ['ko-KR']],
			 ['中文',             ['cmn-Hans-CN', '普通话 (中国大陆)'],
			                     ['cmn-Hans-HK', '普通话 (香港)'],
			                     ['cmn-Hant-TW', '中文 (台灣)'],
			                     ['yue-Hant-HK', '粵語 (香港)']],
			 ['日本語',           ['ja-JP']],
			 ['Lingua latīna',   ['la']]];
var two_line 		 = /\n\n/g;
var one_line 		 = /\n/g;
var first_char 		 = /\S/;		
var create_email 	 = false;
var final_transcript = '';
var recognizing 	 = false;
var ignore_onend;
var start_timestamp;	
var current_style;


for (var i = 0; i < langs.length; i++) {
  select_language.options[i] = new Option(langs[i][0], i);
 };

// select_language.selectedIndex 	= 6;
// select_dialect.selectedIndex 	= 6;

if (!('webkitSpeechRecognition' in window)) {
  $scope.upgrade();
 }; 
  
// This comes here means, browser support web speech API, style button display first	
start_button.style.display = 'inline-block';

//instantiate webkitSpeechRecognition class
var recognition = new webkitSpeechRecognition();

//Modify some attributes for customization.
recognition.continuous 	 	= true;
recognition.interimResults 	= true;

//Event functions
recognition.onstart 	= function() {
   recognizing = true;
   $scope.showInfo('info_speak_now');
   start_img.src = 'assets/images/mic-animate.gif';
 };
recognition.onerror 	= function(event) {
	if (event.error == 'no-speech') {
	  start_img.src = 'assets/images/mic.gif';
	  $scope.showInfo('info_no_speech');
	  ignore_onend = true;
	}
	if (event.error == 'audio-capture') {
	  start_img.src = 'assets/images/mic.gif';
	  $scope.showInfo('info_no_microphone');
	  ignore_onend = true;
	}
	if (event.error == 'not-allowed') {
	  if (event.timeStamp - start_timestamp < 100) {
	    $scope.showInfo('info_blocked');
	  } else {
	    $scope.showInfo('info_denied');
	  }
	  ignore_onend = true;
	}
 };
recognition.onend 		= function() {
	recognizing = false;
	if (ignore_onend) {
	  return;
	}
	start_img.src = 'assets/images/mic.gif';
	if (!final_transcript) {
	  $scope.showInfo('info_start');
	  return;
	}
	$scope.showInfo('');
	if (window.getSelection) {
	  window.getSelection().removeAllRanges();
	  var range = document.createRange();
	  range.selectNode(document.getElementById('final_span'));
	  window.getSelection().addRange(range);
	}
	if ($scope.create_email) {
	  $scope.create_email = false;
	  $scope.createEmail();
	}
 };
recognition.onresult 	= function(event) {
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = $scope.capitalize(final_transcript);
    final_span.innerHTML = $scope.linebreak(final_transcript);
    interim_span.innerHTML = $scope.linebreak(interim_transcript);
   if (final_transcript || interim_transcript) {
      $scope.showButtons('inline-block');
    }
 };

// custom functions for this application
$scope.updateCountry 	= function () {
  console.log('select_dialect.length is ' + select_dialect.length);
  console.log("select_dialect.options.length is " + select_dialect.options.length);
  console.log("select_dialect.options.length -1 is " + ((select_dialect.options.length)-1));
  for (var i = select_dialect.options.length - 1; i >= 0; i--) {
  	console.log("i is" + i);
    select_dialect.remove(i);
  }
  var list = langs[select_language.selectedIndex];
  for (var i = 1; i < list.length; i++) {
    select_dialect.options.add(new Option(list[i][1], list[i][0]));
  }
  select_dialect.style.visibility = list[1].length == 1 ? 'hidden' : 'visible';
 };
$scope.upgrade 			= function () {
  start_button.style.visibility = 'hidden';
  $scope.showInfo('info_upgrade');
 };
$scope.linebreak 		= function (s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
 };
$scope.capitalize 		= function (s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
 };
$scope.createEmail 		= function () {
  var n = final_transcript.indexOf('\n');
  if (n < 0 || n >= 80) {
    n = 40 + final_transcript.substring(40).indexOf(' ');
  }
  var subject = encodeURI(final_transcript.substring(0, n));
  var body = encodeURI(final_transcript.substring(n + 1));
  window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
 };
$scope.copyButton 		= function () {
  if (recognizing) {
    recognizing = false;
    recognition.stop();
  }
 };
$scope.emailButton 		= function () {
  if (recognizing) {
    create_email = true;
    recognizing = false;
    recognition.stop();
  } else {
    $scope.createEmail();
  }
 };
$scope.startButton 		= function (event) {	
  if (recognizing) {
    recognition.stop();
    return;
  }
  final_transcript = '';
  recognition.lang = select_dialect.value;
  recognition.start();
  ignore_onend = false;
  final_span.innerHTML = '';
  interim_span.innerHTML = '';
  start_img.src = 'assets/images/mic-slash.gif';
  $scope.showInfo('info_allow');
  $scope.showButtons('none');
  start_timestamp = event.timeStamp;
  console.log(event);
 	};
$scope.showInfo 		= function (s) {
  if (s) {
    for (var child = info.firstChild; child; child = child.nextSibling) {
      if (child.style) {
        child.style.display = child.id == s ? 'inline' : 'none';
      }
    }
    info.style.visibility = 'visible';
  } else {
    info.style.visibility = 'hidden';
  }
 };
$scope.showButtons 		= function (style) {
	if (style == current_style) {
    return;
  }
  current_style = style;
  copy_button.style.display = style;
  email_button.style.display = style;
 };

$scope.showInfo('info_start');


});
