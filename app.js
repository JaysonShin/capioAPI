var program = require('commander'),
  io = require('socket.io-client'),
  fs = require('fs');

program.version("0.0.4")
  .usage('[options] <wav_files ...>')
  .option('-a, --api-key <String>', 'API Key (required)')
  .option('-e, --endpoint <URL>', 'WebSocket endpoint (default: ws://api.capio.ai)')
  .option('-z, --packet-size <Bytes>', 'Packet Size (default: 2048)', parseInt)
  .option('-u, --user-id <String>', 'User ID (email)')
  .option('-s, --set-auto-stop <Boolean>', 'Enable autostop (default: false)')
  .option('-t, --word-timestamps', 'Return word-level timestamps')
  .option('-w, --word-confidence', 'Return word-level confidence scores')
  .option('-p, --enable-partials', 'Enable partial ASR results')
  .option('-i, --pretty-print', 'Pretty-print results')
  .parse(process.argv);

// Check API Key
if (!program.apiKey) {
  console.error('A Capio authorized API Key is required');
  process.exit(-1);
}

// Check API Endpoint
if (!program.endpoint)
  program.endpoint = 'wss://api.capio.ai';

// -- Audio file validation --
if (!program.args.length) {
  console.log('Audio file(s) not provided');
  process.exit(-1);
}
program.args.forEach(function (audioPath) {
  if (!fs.existsSync(audioPath)) {
    console.log('File not found:', audioPath);
    process.exit(-1);
  }
});

if (!program.packetSize)
  program.packetSize = 2048;

// Put parameters into one object
var requestContext = {
  'apiKey': program.apiKey,
  'clientType': 'NodeJS',
  'partial': !!program.enablePartials,
  'nbest': 1
};

if (!!program.userId)
  requestContext['userID'] = program.userId;

// Set autostop (default is false)
requestContext['autostop'] = program.setAutoStop == 'true';

if (!!program.wordTimestamps)
  requestContext['timestamp'] = program.wordTimestamps;

if (!!program.wordConfidence)
  requestContext['word_confidence'] = program.wordConfidence;


// -- Connect to the server --
var socket = io.connect(program.endpoint, { transports: ['websocket'] });

socket.on('connect_error', function (data) {
  console.log('Unable to connect to WebSocket endpoint:', program.endpoint);
  console.log("ERROR: ", data);
  process.exit(-1);
});

// -- Send context and audio data upon connection--
socket.on('connect', function () {
  socket.send({
	  context: JSON.stringify(requestContext)
  }, function () {
    // Upon success, read audio file and send it as chunks
    var data = fs.readFileSync(program.args[0]);

    for (var i = 0; i < data.length; i += program.packetSize) {
      chunk = data.slice(i, i + program.packetSize);
      // Send a chunk as a JSON
      socket.send({ audio: chunk });
    }

    // After sending all the chunks, disconnect from the server
    socket.send({ disconnect: true });
  });
});

// -- Log responses --
socket.on('message', function (data) {
  if (program.prettyPrint)
    console.log(JSON.stringify(JSON.parse(data), null, 2));
  else
    console.log(data);
});

// Exit after disconnecting
socket.on('disconnect', function () {
  process.exit(0);
});
