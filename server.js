const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  const clinicId = req.path.replace('/', '');

  if (clinicId) {
    fetchData(clinicId, req, res);
  } else {
    res.send('Invalid clinic ID');
  }
});

function fetchData(clinicId, req, res) {
  const apiUrl = 'https://apilink-production.up.railway.app/' + clinicId;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .get(apiUrl, config)
    .then((response) => {
      const data = response.data;
      const playstoreUrl = data.playstoreUrl;
      const applestoreUrl = data.applestoreUrl;

      if (isIOS(req)) {
        res.redirect(applestoreUrl);
      } else {
        res.redirect(playstoreUrl);
      }
    })
    .catch((error) => {
      console.error('API call error:', error);
      res.status(500).send('Qup Redirect Error: Unsupported Device');
    });
}

function isIOS(req) {
  return /iPad|iPhone|iPod|Macintosh/.test(req.headers['user-agent']) && !req.headers['user-agent'].includes('Android');
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
