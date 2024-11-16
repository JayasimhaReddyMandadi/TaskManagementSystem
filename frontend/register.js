document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const errorMessage = document.getElementById('error-message');

    // Form validation functions
    const validateUsername = (username) => {
        return username.length >= 3;
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const validatePasswordMatch = (password, confirmPassword) => {
        return password === confirmPassword;
    };

    // Show error message function
    const showError = (message) => {
        errorMessage.textContent = message;
        errorMessage.classList.remove('d-none');
    };

    // Hide error message function
    const hideError = () => {
        errorMessage.classList.add('d-none');
    };

    // Form submission handler
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideError();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Client-side validation
        if (!validateUsername(username)) {
            showError('Username must be at least 3 characters long');
            return;
        }

        if (!validateEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }

        if (!validatePassword(password)) {
            showError('Password must be at least 8 characters long');
            return;
        }

        if (!validatePasswordMatch(password, confirmPassword)) {
            showError('Passwords do not match');
            return;
        }

        try {
            // Send registration request
            const response = await API.register({
                username,
                email,
                password
            });

            // Show success message and redirect to login
            alert('Registration successful! Please login.');
            window.location.href = 'index.html';
        } catch (error) {
            showError(error.message);
        }
    });

    // Real-time validation feedback
    document.getElementById('username').addEventListener('input', function() {
        this.classList.toggle('is-invalid', !validateUsername(this.value));
    });

    document.getElementById('email').addEventListener('input', function() {
        this.classList.toggle('is-invalid', !validateEmail(this.value));
    });

    document.getElementById('password').addEventListener('input', function() {
        this.classList.toggle('is-invalid', !validatePassword(this.value));
        const confirmPassword = document.getElementById('confirmPassword');
        if (confirmPassword.value) {
            confirmPassword.classList.toggle('is-invalid', 
                !validatePasswordMatch(this.value, confirmPassword.value));
        }
    });

    document.getElementById('confirmPassword').addEventListener('input', function() {
        const password = document.getElementById('password').value;
        this.classList.toggle('is-invalid', 
            !validatePasswordMatch(password, this.value));
    });
});