# ...

Exemplo de requisição à API de Reconhecimento de Linguagem Natural com Axios:

```js
const axios = require('axios');

const url = `https://gateway.watsonplatform.net/natural-language-understanding/api`;
const api_key = `...`;

const options = {
    method: 'post',
    url: `${url}/v1/analyze?version=2018-11-16`,
    auth: {
        'username': 'apikey',
        'password': `${api_key}`
    },
    headers: {
        'Content-Type': 'application/json'
    },
    data: `{
        "text": " I love apples! I don't like oranges. ", 
        "features": {
            "sentiment": {
                "targets": [
                    "apples",
                    "oranges",
                    "broccoli"
                ]
            },
            "keywords": {
                "emotion": true
            }
        }
    }`
}


axios(options)
    .then(response => {
        console.log(JSON.stringify(response.data));
    })
    .catch(error => {
        console.log("Failed!");
        console.log(error);
    });
```