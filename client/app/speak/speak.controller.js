'use strict';

angular.module('webrtcAppApp')
  .controller('SpeakCtrl', function ($scope,$http) {
   	

/* Cross-Browser Web Audio API Playback With Chrome And Callbacks */

// alias the Web Audio API AudioContext-object
var aliasedAudioContext = window.AudioContext || window.webkitAudioContext;
// ugly user-agent-string sniffing
var isChrome = ((typeof navigator !== 'undefined') && navigator.userAgent &&
                navigator.userAgent.indexOf('Chrome') !== -1);
var chromeVersion = (isChrome)?
                    parseInt(
                      navigator.userAgent.replace(/^.*?\bChrome\/([0-9]+).*$/, '$1'),
                      10
                    ) : 0;

 var formFields = ['text','amplitude','wordgap','pitch','speed'];

console.log(meSpeak);
meSpeak.loadConfig('assets/mespeak/mespeak_config.json');

$http.get('assets/mespeak/mespeak_config.json').success(function(data){
  console.log(data);
});
meSpeak.loadVoice("assets/mespeak/voices/en/en.json");

function playSound(streamBuffer, callback) {
    // set up a BufferSource-node
    var audioContext = new aliasedAudioContext();
    var source = audioContext.createBufferSource();
    source.connect(audioContext.destination);
    // since the ended-event isn't generally implemented,
    // we need to use the decodeAudioData()-method in order
    // to extract the duration to be used as a timeout-delay
    audioContext.decodeAudioData(streamBuffer, function(audioData) {
        // detect any implementation of the ended-event
        // Chrome added support for the ended-event lately,
        // but it's unreliable (doesn't fire every time)
        // so let's exclude it.
        if (!isChrome && source.onended !== undefined) {
           // we could also use "source.addEventListener('ended', callback, false)" here
           source.onended = callback;
        }
        else {
           var duration = audioData.duration;
           // convert to msecs
           // use a default of 1 sec, if we lack a valid duration
           var delay = (duration)? Math.ceil(duration * 1000) : 1000;
           setTimeout(callback, delay);
        }
        // finally assign the buffer
        source.buffer = audioData;
        // start playback for Chrome >= 32
        // please note that this would be without effect on iOS, since we're
        // inside an async callback and iOS requires direct user interaction
        if (chromeVersion >= 32) source.start(0);
    },
    function(error) { /* decoding-error-callback */ });
    // normal start of playback, this would be essentially autoplay
    // but is without any effect in Chrome 32
    // let's exclude Chrome 32 and higher to avoid any double calls anyway
    if (!isChrome || chromeVersion < 32) {
        if (source.start) {
            source.start(0);
        }
        else {
            source.noteOn(0);
        }
    }
 }
  
function loadVoice(id) {
  var fname="voices/"+id+".json";
  meSpeak.loadVoice(fname, voiceLoaded);
 }

function voiceLoaded(success, message) {
  if (success) {
    alert("Voice loaded: "+message+".");
  }
  else {
    alert("Failed to load a voice: "+message);
  }
 }

function autoSpeak() {
  // checks url for speech params, sets and plays them, if found.
  // also adds eventListeners to update a link with those params using current values
  var i,l,n,params,pairs,pair,
      speakNow=null,
      useDefaultVoice=true,
      q=document.location.search,
      f=document.getElementById('speakData'),
      s=document.getElementById('voiceSelect');
  if (!f || !s) return; // form and/or select not found
  if (q.length>1) {
    // parse url-params
    params={};
    pairs=q.substring(1).split('&');
    for (i=0, l=pairs.length; i<l; i++) {
      pair=pairs[i].split('=');
      if (pair.length==2) params[pair[0]]=decodeURIComponent(pair[1]);
    }
    // insert params into the form or complete them from defaults in form
    for (i=0, l=formFields.length; i<l; i++) {
      n=formFields[i];
      if (params[n]) {
        f.elements[n].value=params[n];
      }
      else {
        params[n]=f.elements[n].value;
      }
    }
    // compile a function to speak with given params for later use
    // play only, if param "auto" is set to "true" or "1"
    if (params.auto=='true' || params.auto=='1') {
      speakNow = function() {
        meSpeak.speak(params.text, {
          amplitude: params.amplitude,
          wordgap: params.wordgap,
          pitch: params.pitch,
          speed: params.speed
        });
      };
    }
    // check for any voice specified by the params (other than the default)
    if (params.voice && params.voice!=s.options[s.selectedIndex].value) {
      // search selected voice in selector
      for (i=0, l=s.options.length; i<l; i++) {
        if (s.options[i].value==params.voice) {
          // voice found: adjust the form, load voice-data and provide a callback to speak
          s.selectedIndex=i;
          meSpeak.loadVoice('voices/'+params.voice+'.json', function(success, message) {
            if (success) {
              if (speakNow) speakNow();
            }
            else {
              if (window.console) console.log('Failed to load requested voice: '+message);
            }
          });
          useDefaultVoice=false;
          break;
        }
      }
    }
    // standard voice: speak (deferred until config is loaded)
    if (speakNow && useDefaultVoice) speakNow();
  }
  // initial url-processing done, add eventListeners for updating the link
  for (i=0, l=formFields.length; i<l; i++) {
    f.elements[formFields[i]].addEventListener('change', updateSpeakLink, false);
  }
  s.addEventListener('change', updateSpeakLink, false);
  // finally, inject a link with current values into the page
  updateSpeakLink();
 }

function updateSpeakLink() {
  // injects a link for auto-execution using current values into the page
  var i,l,n,f,s,v,url,el,params=new Array();
  // collect values from form
  f=document.getElementById('speakData');
  for (i=0, l=formFields.length; i<l; i++) {
    n=formFields[i];
    params.push(n+'='+encodeURIComponent(f.elements[n].value));
  }
  // get current voice, default to 'en/en' as a last resort
  s=document.getElementById('voiceSelect');
  if (s.selectedIndex>=0) v=s.options[s.selectedIndex].value;
  if (!v) v=meSpeak.getDefaultVoice() || 'en/en';
  params.push('voice='+encodeURIComponent(v));
  params.push('auto=true');
  // assemble the url and add it as GET-link to the page
  url='?'+params.join('&');
  url=url.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;');
  el=document.getElementById('linkdisplay');
  if (el) el.innerHTML='Instant Link: <a href="'+url+'">Speak this</a>.';
 }

  });
