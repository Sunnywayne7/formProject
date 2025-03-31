document.addEventListener('DOMContentLoaded', function() {
const form = document.getElementById('signup-form');

form.addEventListener('submit', (e) => {
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

    fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.log('Error occurred:', data.error);
            const errorMessage = document.getElementById('error-message');
            errorMessage.textContent = data.message;
            errorMessage.style.display = 'block';
            errorMessage.classList.add('show');
        } else {
            const token = data.access_token;
            localStorage.setItem('access_token', token);

            fetch('http://localhost:3000/admin-control/get-forms', {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => response.text())
            .then(htmlContent => {
                const formattedData = htmlContent.replace(/GMT\+0100 \(West Africa Standard Time\)/g, "");

              
                const newTab = window.open('about:blank', '_blank');
                if (newTab) {
                    newTab.document.open();
                    newTab.document.write('<!DOCTYPE html><html><head><title>All Forms</title></head><body></body></html>');
                    newTab.document.close();

                   
                    newTab.document.body.innerHTML = formattedData;
                    const scripts = newTab.document.querySelectorAll("script");
                    scripts.forEach(oldScript => {
                    const newScript = newTab.document.createElement("script");
                    newScript.textContent = oldScript.textContent;
                    newTab.document.body.appendChild(newScript);
                });

                } else {
                    console.error('Failed to open a new tab. The browser may have blocked the popup.');
                }
            })
            .catch(error => console.error('Error fetching forms:', error));
        }
    })
    .catch(error => console.error('Error:', error));
});
})





