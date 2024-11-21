// Wait for the DOM to load before executing
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".needs-validation");

    // Add event listener for form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Check if the form is valid
        if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add("was-validated");
        } else {
            // If valid, collect form data and process registration
            const firstName = document.querySelector("#firstName").value;
            const lastName = document.querySelector("#lastName").value;

            const email = document.querySelector("#floatingInput").value;
            const password = document.querySelector("#floatingPassword").value;
            const confirmPassword = document.querySelector("#floatingPassword").value;
            const termsAccepted = document.querySelector("#autoSizingCheck").checked;

            if (password !== confirmPassword) {
                alert("Passwords do not match. Please re-enter.");
                return;
            }

            if (!termsAccepted) {
                alert("You must agree to the Terms and Conditions.");
                return;
            }

            // Display success message or redirect user
            alert(`Thank you for registering, ${firstName} ${lastName}!`);
            form.reset(); // Reset the form
            form.classList.remove("was-validated");
        }
    });
});
