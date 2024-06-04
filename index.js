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

child.on('restart', function() {
    count++;
    child.args = [streamUrl, wsurl, internalPort, destPort, fps, size, count];
});


child.on('start', function() {
    //console.log('Forever started for ' + streamUrl);
    // green text
    console.log('\x1b[32m%s\x1b[0m', 'Started streaming ' + streamUrl);
    // blue text
    console.log('\x1b[34m%s\x1b[0m', 'Internal WS port: ' + internalPort);

    console.log('\x1b[31m%s\x1b[0m', 'Test HTTP Port ' + destPort);
    // get yes/no from user
    var readline = require('readline');
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Open test page in browser? (y/n) ", function(answer) {
        if(answer == "y"){
            var opn = require('opn');
            opn('http://localhost:' + destPort);
        }
        rl.close();
    });
});