# Capio ASR Client

Capio's Automatic Speech Recognition (ASR) Clients provide an easy access to interact with the  **Capio ASR engine**, hosted on Capio's STaaS (Speech Team as a Service) platform. WebSocket protocol is used to stream audio files to the ASR engine and return the transcribed text. To find the details of consuming ASR engine, please refer to [the documentation of the API](https://capio.readme.io/docs/transcription-streaming-api).

### Platform optimized clients
Binaries of platform optimized clients are available on [releases](https://github.com/capioai/NodeJS.transcription.client/releases) section. Download one of the following. If either binary does not work on your environment, try running the Node JS app as explained [below](#NodeJS).
- Ubuntu: ```capio-client-ubuntu``` (tested on 14.04.4 and 14.04.3 LTS)
- Mac OSX: ```capio-client-osx``` (tested on OS 10.11.3)

### Example usage

#### Binary

```JSON
$ ./capio-client-osx --apikey <api-key> test-audio.wav
{  
  "result":[  
    {  
      "alternative":[  
        {  
          "confidence":1,
          "transcript":"how do i get a passport"
        }
      ],
      "final":true
    }
  ],
  "result_index":0,
  "transactionID":"c62313da04214af69f9981a714c84267"
}
```


#### <a name="NodeJS"></a>NodeJS
If you do not have an environment to run NodeJS, please install [NodeJS](https://nodejs.org/en/) first. Then install the modules by
```
$ npm install
```
After the dependencies are installed, run the app by the following command.
```JSON
$ node app.js -a <api-key> test-audio.wav
{  
  "result":[  
    {  
      "alternative":[  
        {  
          "confidence":1,
          "transcript":"how do i get a passport"
        }
      ],
      "final":true
    }
  ],
  "result_index":0,
  "transactionID":"c62313da04214af69f9981a714c84267"
}
```

### Client Options
- **-h, --help**

	Output the help menu
- **-V, --version**

	Display client version information
- **-a, --api-key [string]**

	Pass API Key for the Capio Speech Service (required)
- **-e, --endpoint [url]**

	Select URI endpoint for the Capio Speech Service

	Default: ```ws://api.capio.ai```
- **-s, --set-auto-stop**

	 Auto utterance-end detection

	 Default: ```false```
- **-t, --word-timestamps**

	 Request word-level timestamps in results

	 Default: ```false```
- **-w, --word-confidence**

	 Request word-level confidence scores in results

	 Default: ```false```	 
- **-p, --enable-partial**

	Request partial responses from the service in real-time.

	Default: ```false```
- **-u, --userid [string]**

	Optional User ID to associate with the request. Email ID can be used here.

### Audio file specifications
The API accepts an audio file that satisfies the following:
- File Type: WAV (RIFF)
- Channels: 1
- Sample Rate: 16000
- Precision: 16-bit
- Sample Encoding: 16-bits signed Integer PCM
