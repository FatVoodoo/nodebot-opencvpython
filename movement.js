var opencv = require('node-python-opencv');
const fs = require('fs');

var image1 = fs.readFileSync('test1.jpg', {encoding: 'base64'});
var image2 = fs.readFileSync('test3.jpg', {encoding: 'base64'});

var detector = new opencv.detector({
    port: 9009
});

// Arguments :
// image1 : image de base au format base64
// image2 : image au format base64 où trouver les différences 

//setTimeout(function () {
	console.log('ready');
 detector.findMove({
    'image1': image1,
    'image2': image2
 }, function (data, err) {
	console.log(err);
    // Return JSON object {x: N, y: N, w: N, h: N}
    console.log(JSON.stringify(data));
 });
//}, 5000);

