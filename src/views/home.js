import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = (props) => {
  const { clinicId } = props.match.params;
  const [playstoreUrl, setPlaystoreUrl] = useState('');
  const [applestoreUrl, setApplestoreUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const apiUrl = 'https://pratikqupp.github.io/url_redirect/jsondata.json';
    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        setPlaystoreUrl(data.playstoreUrl);
        setApplestoreUrl(data.applestoreUrl);
        setLoading(false);
      })
      .catch((error) => {
        console.error('API call error:', error);
        setError('Qup Redirect Error: Unsupported Device');
        setLoading(false);
      });
  }, []);

  function isAndroid() {
    return /Android/i.test(navigator.userAgent);
  }

  function isIOS() {
    return /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent) && !window.MSStream;
  }

  return (
    <div>
      {loading ? (
        <div className="loader">Loading...</div>
      ) : error ? (
        <div className="message">{error}</div>
      ) : isAndroid() ? (
        <RedirectLink url={playstoreUrl} />
      ) : isIOS() ? (
        <RedirectLink url={applestoreUrl} />
      ) : (
        <RedirectLink url={applestoreUrl} />
      )}
    </div>
  );
}

function RedirectLink({ url }) {
  useEffect(() => {
    if (url) {
      window.location.href = url;
    }
  }, [url]);

  return null;
}

export default App;
