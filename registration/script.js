document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!username || !email || !password) {
        alert('Please fill out all fields.');
    } else {
        alert('Registration successful!');
        // Here, you would typically handle further submission logic,
        // such as sending data to a server or redirecting the user.
    }
});
