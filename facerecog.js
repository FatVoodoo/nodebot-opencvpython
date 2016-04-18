var opencv = require('node-python-opencv');
const fs = require('fs');

var image = fs.readFileSync('RonModels1.jpg', {encoding: 'base64'});
//console.log(image);
var detector = new opencv.detector({
    port: 9009
});

setTimeout(function () {
        console.log('ready');
    detector.recognizeFaces({
        'csv': 'ron.csv'   ,
        'image': image,
        'haarcascade': 'haarcascade_frontalface_default.xml'
    }, function (data, err) {
        console.log(err);
        // Return JSON object {faces: [{name: 'xxx', x: N, y: N, w: N, h: N}, ...]}
        console.log(JSON.stringify(data));
    });
}, 5000);
