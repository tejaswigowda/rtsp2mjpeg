if (process.argv.length < 4) {
    console.log("Usage: node app.js <ipAddr> <port>");
    process.exit();
}
var ipAddr = process.argv[2];
var port = process.argv[3];

var stream = require('node-rtsp-stream')
const express = require('express')
const app = express()

var stream = new stream({
    name: 'name',
    streamUrl: 'rtsp://Garden:mixmesa1@192.168.1.110/stream1',
    wsPort: 9999,
    ffmpegOptions: { // options ffmpeg flags
        '-stats': '', // an option with no neccessary value uses a blank string
        '-r': 30, // options with required values specify the value after the key
        '-s': '1920x1080'
    }
})


// serve /public folder
app.use(express.static(__dirname + '/public'));

app.listen(3000, () => {
    console.log('Listening on port 3000')
});


var WebSocket = require('ws');
var wsMaster = new WebSocket('ws://localhost:9999');
wsMaster.on('open', function open() {
    console.log('connected');
});
wsMaster.on('close', function close() {
    console.log('disconnected');
});
wsMaster.on('message', function incoming(data) {
    // console.log(data);
    write(data);
});



var ws = null;

function connectws() {
    ws = new WebSocket('ws://' + ipAddr + ':' + port + '/jpgstream_server');
    ws.on('open', function open() {
        console.log("connected");
        //write("hello");
    });

    ws.on('message', function incoming(data) {
        console.log(data);
    });

    ws.on('close', function close() {
        console.log('disconnected');
        connectws();
    });
}

connectws();

function write(data) {
    // send binary data
    if (ws.readyState == 1){// && numberofclients > 0) {
        console.log("sending data");
        ws.send(data);
    }
}






