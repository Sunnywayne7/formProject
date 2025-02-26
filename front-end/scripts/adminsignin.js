const form = document.getElementById('login-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const userName = document.getElementById('username').value;
    const password = document.getElementById('password').value;
   
    const userData = {
        email,
        userName,
        password,
        
    };

    fetch('http://localhost:3000/auth/superadm1n-signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.error) {
            const errorMessage = document.getElementById('error-message');
          errorMessage.textContent = data.message;
          errorMessage.style.display = 'block';
          errorMessage.classList.add('show');
        } else {
            if(!data.access_token) {
                console.log('access token not found')
            }
            const token = data.access_token
            console.log('access_token :', token)
            localStorage.setItem('access_token', token)
            window.location.href = "assignRoles.html"
        }
    })

    .catch((error) => {
        console.error('Error:', error);
    })

}
)