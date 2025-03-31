const form = document.getElementById('main-form');

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const date_time = document.getElementById('date_time').value;
  const name = document.getElementById('name').value;
  const surname = document.getElementById('surname').value;
  const email = document.getElementById('email').value;
  const phoneNumber = document.getElementById('phone-number').value;
  const whatsapp_no = document.getElementById('whatsapp-number').value;
  const house_address = document.getElementById('house-address').value;
  const age_group = document.getElementById('age-group').value;
  const birthday = document.getElementById('birthday').value;
  const born_again = document.getElementById('born-again').value;
  const current_church = document.getElementById('current-church').value;
  const born_again_date = document.getElementById('born-again-date').value;

  const userData = {
    date_time,
    name,
    surname,
    email,
    phoneNumber,
    whatsapp_no,
    house_address,
    age_group,
    birthday,
    born_again,
    current_church,
    born_again_date
  };

  fetch('http://localhost:3000/form/fill-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then((response) => response.text())
  .then((data) => {
    window.location.href = "response.html";
  })
  .catch((error) => {
    console.error('Error:', error);
  })
})
