// Handle form submission
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
  
    // Get the updated table data
    const updatedFormData = [];
    const tableRows = document.querySelectorAll('#form-data table tbody tr');
  
    tableRows.forEach((row) => {
      const updatedFormDataObj = {};
  
      row.querySelectorAll('td').forEach((cell, index) => {
        if (index === 0) {
          updatedFormDataObj.id = cell.textContent;
        } else if (index === 1) {
          updatedFormDataObj.name = cell.textContent;
        } else if (index === 2) {
          updatedFormDataObj.surname = cell.textContent;
        } else if (index === 3) {
          updatedFormDataObj.email = cell.textContent;
        } else if (index === 4) {
          updatedFormDataObj.phoneNumber = cell.textContent;
        } else if (index === 5) {
          updatedFormDataObj.whatsappNo = cell.textContent;
        } else if (index === 6) {
          updatedFormDataObj.houseAddress = cell.textContent;
        } else if (index === 7) {
          updatedFormDataObj.ageGroup = cell.textContent;
        } else if (index === 8) {
          updatedFormDataObj.birthday = cell.textContent;
        } else if (index === 9) {
          updatedFormDataObj.bornAgain = cell.textContent;
        } else if (index === 10) {
          updatedFormDataObj.currentChurch = cell.textContent;
        } else if (index === 11) {
          updatedFormDataObj.bornAgainDate = cell.textContent;
        }
      });
  
      updatedFormData.push(updatedFormDataObj);
    });
  
    // Get the id value from the HTML form
    const idInput = document.getElementById('update-form-id');
    const id = idInput.value;
  
    fetch(`/admin-control/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedFormData[0])
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  
    // Reload the page with the updated data
    window.location.reload();
  });
  