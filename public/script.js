
document.addEventListener('DOMContentLoaded', function () {
  // Extract clinicId from the URL
  const clinicId = ROOM_ID;

  const apiUrl = 'https://script.google.com/macros/s/AKfycbwwdQmnQYdHo0VP2IjdiZv4ClrCeEo1TeiDx7pzAH-OyYcr0k2Q4JIrXNXCysx10jXs-g/exec'; // Replace with your API endpoint

  const loader = document.querySelector('.loader');
  const message = document.querySelector('.message');

  // // Show loader while making the API call
  // loader.style.display = 'block';

  // Make an API call to get the app store URLs
  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({
      clinicId: clinicId
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then((response) => response.json())
    .then((data) => {
      // Check the response for the Play Store and App Store URLs
      const playstoreUrl = data.playstoreUrl; // Replace with the actual response property
      const applestoreUrl = data.applestoreUrl; // Replace with the actual response property
      if (isAndroid()) {
        window.location.href = playstoreUrl;
      } else if (isIOS()) {
        window.location.href = applestoreUrl;
      } else {
        // If neither Android nor iOS, show an error message
        // displayErrorMessage();
        window.location.href = playstoreUrl;
      }
    })
    .catch((error) => {
      console.error('API call error:', error);
      displayErrorMessage();
    });
});

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function displayErrorMessage() {
  // const loader = document.querySelector('.loader');
  // const message = document.querySelector('.message');

  // loader.style.display = 'none';
  // message.textContent = 'Qup Redirect Error: Unsupported Device';
  // message.style.display = 'block';
}
