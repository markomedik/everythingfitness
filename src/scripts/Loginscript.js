
  document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById('loginButton');
    if (button) {
      button.addEventListener('click', handleButtonClick);
    }
  });
  
  function handleButtonClick() {
   
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
  
   
    fetch('url_za_obradu_login_podataka.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {       
        console.log(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }
  