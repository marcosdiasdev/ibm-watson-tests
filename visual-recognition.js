const constants = require('./constants');
const fs = require('fs');
const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');

const version = '2018-03-19';
const apikey = constants.visualRecognitionAPIKey;
const imagePath = './assets/people.jpg';

const visualRecognition = new VisualRecognitionV3({
  version: `${version}`,
  iam_apikey: `${apikey}`,
});

const detectFacesParams = {
  images_file: fs.createReadStream(imagePath),
};

visualRecognition.detectFaces(detectFacesParams)
.then(detectedFaces => {
    console.log(JSON.stringify(detectedFaces, null, 2));
})
.catch(err => {
    console.log('error:', err);
});