#!/usr/bin/env node

var streamUrl = process.argv[2];
var wsurl  = process.argv[3];
var destPort = parseInt(process.argv[4] || "3000");
var internalPort = parseInt(process.argv[5] || "9999");
var fps = parseInt(process.argv[6] || "30")
var size = process.argv[7] || "1920x1080"

console.log(streamUrl, wsurl, internalPort, fps, size);


var stream = require('node-rtsp-stream')
const express = require('express')
const app = express();


var stream = new stream({
    name: 'name',
    streamUrl: streamUrl,
    wsPort: internalPort,
    ffmpegOptions: { // options ffmpeg flags
        '-stats': '',
        '-r': fps,
        '-s': size
    }
})

// serve /public folder
app.use(express.static(__dirname + '/public'));

app.listen(destPort, () => {
    console.log('Listening on port ' + destPort)
});


var WebSocket = require('ws');
var wsMaster = new WebSocket("ws://localhost:" + internalPort);
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
    ws = new WebSocket(wsurl);
    ws.on('open', function open() {
        console.log("connected");
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
        ws.send(data);
    }
}


// check if stream is still running
setTimeout(function() {
    isAlive();
}, 1000*5);

function isAlive(){
    if(stream.mpeg1Muxer.stream.exitCode == null){
        console.log("stream is running");
        setTimeout(isAlive, 1000*5);
    } else {
        console.log("stream is not running");
        process.exit();
    }
}





