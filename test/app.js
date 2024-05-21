var stream = require('node-rtsp-stream')
const express = require('express')
const app = express()

var stream = new stream({
  name: 'name',
  streamUrl: 'rtsp://Garden:mixmesa1@192.168.1.128/stream1',
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




