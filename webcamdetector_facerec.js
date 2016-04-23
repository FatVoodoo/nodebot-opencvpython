var opencv = require('node-python-opencv');

var webcamdetector = new opencv.webcamdetector({
    port: 9010
});

setTimeout(function () {
        console.log('ready');
    webcamdetector.recognizeFaces({
        'csv': 'ron.csv',
        'haarcascade': 'face.xml'
    }, function (data, err) {
        if (err) 
            console.log("Error:" + err);
        else 
        // Return JSON object {faces: [{name: 'xxx', x: N, y: N, w: N, h: N}, ...]}
            console.log(JSON.stringify(data));
    });
}, 5000);

