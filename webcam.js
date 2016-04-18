var opencv = require('node-python-opencv');

// Numéro de port facultatif
var webcam = new opencv.webcam({
    port: 8091
});
webcam.frame(function (image, err) {
    // image est au format base64
	console.log(err);
	console.log(image);
});
