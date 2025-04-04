    const superAdminSignUp = document.getElementById('signup-form');

superAdminSignUp.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const userName = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const firstName = document.getElementById('firstname').value;
    const lastName = document.getElementById('lastname').value;

    const userData = {
        email,
        userName,
        password,
        firstName,
        lastName
    };

    fetch('http://localhost:3000/auth/superadm1n-signup', {
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
            const token = data.access_token
            localStorage.setItem('access_token', token)
            window.location.href = "assignRoles.html";
        }
    })

    .catch((error) => {
        console.error('Error:', error);
    })

}
)


