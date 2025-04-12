const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/proxy', (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send('Missing url parameter');
  }

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36',
    'Referer': 'https://daddylive.live/',
    'Origin': 'https://daddylive.live/',
  };

  request({ url: targetUrl, headers })
    .on('error', (err) => {
      res.status(500).send('Proxy error: ' + err.message);
    })
    .pipe(res);
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
