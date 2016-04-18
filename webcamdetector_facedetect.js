var opencv = require('node-python-opencv');

var webcamdetector = new opencv.webcamdetector({
    port: 9010
});

setTimeout(function () {
        console.log('ready');
    webcamdetector.findFaces({
            'haarcascade': 'haarcascade_frontalface_default.xml',
            'scaleFactor': 1.2,
            'minNeighbors': 8
        }, function (data, err) {
            if (err) 
                console.log("Error:" + err);
            else    
                // Return JSON object {faces: [{x: N, y: N, w: N, h: N}, ...]}
                console.log(JSON.stringify(data));
        });
}, 5000);

