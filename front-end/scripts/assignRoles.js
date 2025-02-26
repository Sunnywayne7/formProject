const assignRoleForm = document.getElementById('assignRole');
const assignRoleUsernameInput = document.getElementById('assignRoleUsername');
const assignRoleRolenameInput = document.getElementById('assignRoleRolename');

assignRoleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userName = assignRoleUsernameInput.value;
    const roleName = assignRoleRolenameInput.value;
   
    const userData = {
        userName,
        roleName
        
    };
    
   
  return fetch('http://localhost:3000/assign-roles/assign-admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  })
  .then((response) => {
    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
    }
    return response.json()
  })
  .then((data) => {
    if(data.error) {
      const errorMessage = document.getElementById('error-message');
      errorMessage.textContent = data.message;
      errorMessage.style.display = 'block';
      errorMessage.classList.add('show');
    } else {
      alert(data.message)
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  })
})

const revokeRoleForm = document.getElementById('revokeRole');
const revokeRoleUsernameInput = document.getElementById('revokeRoleUsername');
const revokeRoleRolenameInput = document.getElementById('revokeRoleRolename');

revokeRoleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userName = revokeRoleUsernameInput.value;
    const roleName = revokeRoleRolenameInput.value;
   
    const userData = {
        userName,
        roleName
        
    };

    return fetch('http://localhost:3000/assign-roles/revoke-role', {
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
            alert(data.message)
        }
    })

    .catch((error) => {
        console.error('Error:', error);
    })

}
)