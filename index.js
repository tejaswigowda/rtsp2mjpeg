#!/usr/bin/env node
if (process.argv.length < 4) {
    console.log("Usage: rtsp2WebSocket <rtsp-stream-url> <ws-url> <dest-port>(optional; default=3000) <internalPort>(optional; default=9999) <fps>(optional/ default = 30) <size>(optional;default=1920x1080)");
    process.exit();
}

var streamUrl = process.argv[2];
var wsurl  = process.argv[3];
var destPort = parseInt(process.argv[4] || "3000");
var internalPort = parseInt(process.argv[5] || "9999");
var fps = parseInt(process.argv[6] || "30")
var size = process.argv[7] || "1920x1080"

//console.log(streamUrl, wsurl, internalPort, fps, size);

var forever = require('forever-monitor');

var child = new (forever.Monitor)('app.js', {
    max: 30000,
    silent: false,
    args: [streamUrl, wsurl, internalPort, fps, size]
});


child.start();