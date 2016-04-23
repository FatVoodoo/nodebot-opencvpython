
var opencv = require('node-python-opencv');

var commands = {};
commands["forward"] = "7100028080808001";
commands["backward"] = "7100828080808002";

commands["left"] = "7100808280808008";
commands["right"] = "7100800280808004";

commands["down"] = "7100808002808010";
commands["up"] = "7100808082808020";

commands["light"] = "7100808080800240";
commands["fire"] = "7100808080808280";

var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();
btSerial.on('found', function(address, name) {
    console.log(address);
    btSerial.findSerialPortChannel(address, function(channel) {
        btSerial.connect(address, channel, function() {
            console.log(address);
            console.log('connected');

            btSerial.on('data', function(buffer) {
                //console.log(buffer);
            });
        }, function () {
            console.log('cannot connect');
        });

        // close the connection when you're ready
        btSerial.close();
    }, function() {
        console.log('found nothing');
    });
});

btSerial.inquire();

var sendCommand = function(command) {

    if (btSerial.isOpen()) {
        btSerial.write(new Buffer(command, 'hex'),
         function (err, bytesWritten) {
            if (err) console.log(err);});
    }
}

lastcommand = "";
setInterval(function () {
        //console.log(lastcommand);
        if (lastcommand != "") {
                console.log("sending " + lastcommand);
                sendCommand(lastcommand);
        }
},450);

var webcamdetector = new opencv.webcamdetector({
    port: 9010,
    useFastDetect : true
});
setTimeout(function () {
        console.log('ready');
    webcamdetector.findFaces({
            'haarcascade': 'face.xml',
            'scaleFactor': 1.2,
            'minNeighbors': 2
        }, function (data, err) {
            if (err)
                console.log("Error:" + err);
            else
            {
            // Return JSON object {faces: [{x: N, y: N, w: N, h: N}, ...]}
            console.log(JSON.stringify(data));
            if (data.faces[0])
            {
              var face = data.faces[0];
              var x = Number(face.x);
              var y = Number(face.y);
              var w = Number(face.w);
              var h = Number(face.h);

              console.log(x);
              if (w > 60 && h > 60) {
                      console.log('fire');
                      lastcommand = commands['fire'];
              }
              else if (x < 10)
                      lastcommand = commands['left'];
              else if (x > 90)
                      lastcommand = commands['right'];
              else
                      lastcommand = ""

            }
          }

        });
}, 5000);
