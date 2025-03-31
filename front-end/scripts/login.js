const form = document.getElementById('login-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const userName = document.getElementById('userName').value;
    const password = document.getElementById('password').value;

    const userData = { email, userName, password };

    fetch('http://localhost:3000/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

                // Open a new blank tab
                const newTab = window.open('about:blank', '_blank');
                if (newTab) {
                    // Wait for the new tab to load, then set its content
                    newTab.document.open();
                    newTab.document.write('<!DOCTYPE html><html><head><title>All Forms</title></head><body></body></html>');
                    newTab.document.close();

                    // Set the new tab's body content safely
                    newTab.document.body.innerHTML = formattedData;

                    // Find and execute scripts manually
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
