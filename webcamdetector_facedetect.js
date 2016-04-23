var opencv = require('node-python-opencv');

var webcamdetector = new opencv.webcamdetector({
    port: 9010,
    useFastDetect : true
});

setTimeout(function () {
        console.log('ready');
    webcamdetector.findFaces({
            'haarcascade': 'face.xml',
            'scaleFactor': 1.2,
            'minNeighbors': 8
        }, function (data, err) {
            if (err) 
                console.log("Error:" + err);
            else    
                // Return JSON object {faces: [{x: N, y: N, w: N, h: N}, ...]}
                sendDataAsync(data)
        });
}, 5000);

function sendDataAsync(data) {
    return new Promise(function (resolve, reject){
        console.log(JSON.stringify(data));
        resolve();
    })
}