# Capio ASR Client

Capio ASR Clients provide an easy access to interact with the  **Capio ASR Service**. WebSocket protocol is used to stream audio files to the ASR Service and return the transcribed text. To find the details, please go to [the documentation of the API](https://capio.readme.io/docs/transcription-streaming-api).

### Platform optimized clients
- Ubuntu: ```bin/capio-client-ubuntu```
- Mac OSX: ```bin/capio-client-osx```

### Example usage
```
$ ./capio-client-osx -a <api-key> test-audio.wav
{  
  "result":[  
    {  
      "alternative":[  
        {  
          "confidence":1,
          "transcript":"show me the weather forecast for chicago usa and two days from now"
        }
      ],
      "final":true
    }
  ],
  "result_index":0,
  "transactionID":"1a888ce7157045d5bfffd7d38cb54c8d"
}
```

### Client Options
- **-h, --help**

	Output the help menu
- **-V, --version**

	Display client version information
- **-a, --apikey [string]**

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
