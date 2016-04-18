var opencv = require('node-python-opencv');

// Numéro de port facultatif
var webcam = new opencv.webcam({
    port: 8091
});

var detector = new opencv.detector({
    port: 9009
});

webcam.frame(function (image, err) {
    // image format base64
    if (err) {
        console.log(err);
    } else
    //console.log(image);
    if (image) {
         detector.recognizeFaces({
        'csv': 'ron.csv'   ,
        'image': image,
        'haarcascade': 'haarcascade_frontalface_default.xml'
    }, function (data, err) {
        if (err) {
            //console.log(err);
        } else
        {
            // Return JSON object {faces: [{name: 'xxx', x: N, y: N, w: N, h: N}, ...]}
            console.log(JSON.stringify(data));
        }
    });
    }
});

