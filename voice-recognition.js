const constants = require('./constants');
const mic = require('mic');
const fs = require('fs');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
 
const micInstance = mic({
    rate: '16000',
    channels: '1',
    debug: true,
    exitOnSilence: 5
});

const micInputStream = micInstance.getAudioStream();

micInstance.start();

// -------------------------------------------------------

micInputStream.on('data', function(data) {
    //console.log("Recieved Input Stream: " + data.length);
});
 
micInputStream.on('error', function(err) {
    //console.log("Error in Input Stream: " + err);
});
 
micInputStream.on('startComplete', function() {
    //console.log("Got SIGNAL startComplete");
});
    
micInputStream.on('stopComplete', function() {
    //console.log("Got SIGNAL stopComplete");
});
    
micInputStream.on('pauseComplete', function() {
    //console.log("Got SIGNAL pauseComplete");
});
 
micInputStream.on('resumeComplete', function() {
    //console.log("Got SIGNAL resumeComplete");
});
 
micInputStream.on('silence', function() {
    //console.log("Got SIGNAL silence");
    micInstance.stop();    
});
 
micInputStream.on('processExitComplete', function() {
    //console.log("Got SIGNAL processExitComplete");
});

// -------------------------------------------------------

// Configura e inicia o serviço de voz para texto
const speechToText = new SpeechToTextV1({
  iam_apikey: constants.speechToTextAPIKey,
  url: 'https://stream.watsonplatform.net/speech-to-text/api'
});

// Faz o pipe do arquivo de áudio para o Watson 
const textStream = micInputStream.pipe(
    speechToText.recognizeUsingWebSocket({
        content_type: 'audio/l16; rate=16000; channels=1', 
        model: 'pt-BR_BroadbandModel'
    })
).setEncoding('utf8');

// Escreve o texto gerado após o fim da gravação
textStream.on('data', (text) => {
  console.log('O Watson ouviu:', text);
});