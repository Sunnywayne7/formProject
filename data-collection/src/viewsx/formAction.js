console.log("done")
document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById("forms-table");

    if (!table) {
        console.error("Table element not found!");
        return;
    }

    const accessToken = table.getAttribute("data-access-token");
    console.log("Retrieved Access Token:", accessToken); // Debugging

    if (!accessToken) {
        console.warn("No access token found.");
        return;
    }

    document.querySelectorAll(".edit-btn").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            const formId = this.getAttribute("href").split("/").pop();
            console.log("Form ID:", formId); // Debugging

            fetch(`http://localhost:3000/admin-control/secure-update-form/${formId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then(response => {
                console.log("Response status:", response.status);
                if (response.redirected) {
                    console.log("Redirecting to:", response.url);
                    window.location.href = response.url;
                } else {
                    return response.text();
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
        });
    });
});