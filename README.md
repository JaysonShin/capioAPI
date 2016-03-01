# Capio ASR Client

Capio ASR Clients provide an easy access to interact with the  **Capio ASR Service**. WebSocket protocol is used to stream audio files to the ASR Service and return the transcribed text.

### Platform optimized clients
- Ubuntu: ```capio-client-ubuntu```
- Mac OSX: ```capio-client-osx```

### Usage
```
$ ./capio-client-*
```
#### Example
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

	Capio authorized API Key authorized
- **-e, --endpoint [url]**

	URI endpoint for the Capio Speech Service

	Default: ```ws://api.capio.ai```
- **-s, --set-auto-stop**

	 Auto utterance-end detection

	 Default: ```false``
- **-t, --word-timestamps**

	 Return word-level timestamps

	 Default: ```false```
- **-w, --word-confidence**

	 Return word-level confidence scores

	 Default: ```false```	 
- **-p, --enable-partial**

	Send partial responses received from the service in real-time.

	Default: ```true```
- **-u, --userid [string]**

	Optional User ID to associate with the request. Email ID can be used here.
