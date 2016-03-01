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
  program.endpoint = 'ws://api.capio.ai';

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
// -- Audio file validation --

if (!program.packetSize)
  program.packetSize = 2048;


var requestContext = {
  'apiKey': program.apiKey,
  'clientType': 'NodeJS',
  'partial': !!program.enablePartials,
  'nbest': 1
};

if (!!program.userId)
  requestContext['userID'] = program.userId;

// Default to false
requestContext['autostop'] = program.setAutoStop == 'true';

if (!!program.wordTimestamps)
  requestContext['timestamp'] = program.wordTimestamps;

if (!!program.wordConfidence)
  requestContext['word_confidence'] = program.wordConfidence;

var socket = io.connect(program.endpoint, { transports: ['websocket'] });

socket.on('connect_error', function (data) {
  console.log('Unable to connect to WebSocket endpoint:', program.endpoint);
  console.log("ERROR: ", data);
  process.exit(-1);
});

socket.on('connect', function () {
  socket.send({
	  context: JSON.stringify(requestContext)
  }, function () {
    var data = fs.readFileSync(program.args[0]);

    for (var i = 0; i < data.length; i += program.packetSize) {
      chunk = data.slice(i, i + program.packetSize);
      socket.send({ audio: chunk });
    }
    socket.send({ disconnect: true })
  });
});

socket.on('message', function (data) {
  if (program.prettyPrint)
    console.log(JSON.stringify(JSON.parse(data), null, 2));
  else
    console.log(data);
});

socket.on('disconnect', function () {
  process.exit(0);
});
