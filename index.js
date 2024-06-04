#!/usr/bin/env node

var forever = require('forever-monitor');

if (process.argv.length < 3) {
    console.log("Usage: rtsp2WebSocket <rtsp-stream-url> <ws-url>(optional; default=null) <dest-port>(optional; default=3000) <internalPort>(optional; default=9999) <fps>(optional/ default = 30) <size>(optional;default=1920x1080)");
    process.exit();
}

var streamUrl = process.argv[2];
var wsurl  = process.argv[3] || null;
var internalPort = parseInt(process.argv[4] || "9999");
var destPort = parseInt(process.argv[5] || "3000");
var fps = parseInt(process.argv[6] || "30")
var size = process.argv[7] || "1920x1080"

var count = 0;
var child = new (forever.Monitor)('app.js', {
    max: 30000,
    silent: true,
    args: [streamUrl, wsurl, internalPort, destPort, fps, size, count++]
});

child.start();