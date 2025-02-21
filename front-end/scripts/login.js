const form = document.getElementById('login-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const userName = document.getElementById('userName').value;
    const password = document.getElementById('password').value;

    const userData = {
        email,
        userName,
        password
    };

    console.log('Request Data:', userData);

    fetch('http://localhost:3000/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then((response) =>{ console.log('Response received:', response);
    return response.json();
})
    .then((data) => {
      console.log('Data received:', data);
        if (data.error) {
          console.log('Error occurred:', data.error);
          const errorMessage = document.getElementById('error-message');
          errorMessage.textContent = data.message;
          errorMessage.style.display = 'block';
          errorMessage.classList.add('show');
        } else {
          console.log('login sucessful')
          const token = data.access_token
          console.log('jwtToken: ', token) 
          localStorage.setItem('access_token', token)
          window.location.href = "index.html";
        
        }
      })
            .catch((error) => console.error(error));
  
});


