#!/usr/bin/env node
if (process.argv.length < 4) {
    console.log("Usage: node rtsp2WebSocket.js <rtsp-stream-url> <ws-url> <internalPort>(optional; default=9999) <fps>(optional/ default = 30) <size>(optional;default=1920x1080)");
    process.exit();
}
var streamUrl = process.argv[2];
var wsurl  = process.argv[3];
var internalPort = parseInt(process.argv[4] || "9999");
var fps = parseInt(process.argv[5] || "30")
var size = process.argv[6] || "1920x1080"


var forever = require('forever-monitor');

var child = new (forever.Monitor)('app.js', {
    max: 3,
    silent: true,
    args: [streamUrl, wsurl, internalPort, fps, size]
});