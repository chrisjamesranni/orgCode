document.addEventListener('DOMContentLoaded', function() {
    // Add client-side validation to login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', validateLoginForm);
    }
    
    // Add client-side validation to signup form
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', validateSignupForm);
    }
});

// Login Form Validation
function validateLoginForm(e) {
    let isValid = true;
    const form = e.target;
    
    // Get form elements
    const email = form.querySelector('input[name="email"]');
    const password = form.querySelector('input[name="password"]');
    
    // Clear previous error messages
    clearErrors(form);
    
    // Validate email
    if (!email.value.trim()) {
        displayError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        displayError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate password
    if (!password.value) {
        displayError(password, 'Password is required');
        isValid = false;
    }
    
    if (!isValid) {
        e.preventDefault();
    }
}

// Signup Form Validation
function validateSignupForm(e) {
    let isValid = true;
    const form = e.target;
    
    // Get form elements
    const username = form.querySelector('input[name="username"]');
    const email = form.querySelector('input[name="email"]');
    const password = form.querySelector('input[name="password"]');
    const confirmPassword = form.querySelector('input[name="confirm_password"]');
    
    // Clear previous error messages
    clearErrors(form);
    
    // Validate username
    if (!username.value.trim()) {
        displayError(username, 'Username is required');
        isValid = false;
    } else if (username.value.length < 3) {
        displayError(username, 'Username must be at least 3 characters');
        isValid = false;
    } else if (!/^[A-Za-z][A-Za-z0-9_.]*$/.test(username.value)) {
        displayError(username, 'Username must start with a letter and can only contain letters, numbers, dots or underscores');
        isValid = false;
    }
    
    // Validate email
    if (!email.value.trim()) {
        displayError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        displayError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate password
    if (!password.value) {
        displayError(password, 'Password is required');
        isValid = false;
    } else if (password.value.length < 8) {
        displayError(password, 'Password must be at least 8 characters');
        isValid = false;
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(password.value)) {
        displayError(password, 'Password must include at least one uppercase letter, one lowercase letter, and one number');
        isValid = false;
    }
    
    // Validate confirm password
    if (confirmPassword.value !== password.value) {
        displayError(confirmPassword, 'Passwords must match');
        isValid = false;
    }
    
    if (!isValid) {
        e.preventDefault();
    }
}

// Helper Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function displayError(inputElement, message) {
    const formGroup = inputElement.closest('.form-group');
    formGroup.classList.add('has-error');
    
    // Check if error message container already exists
    let errorDiv = formGroup.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        formGroup.appendChild(errorDiv);
    }
    
    // Add error message
    const errorSpan = document.createElement('span');
    errorSpan.textContent = message;
    errorDiv.appendChild(errorSpan);
}

function clearErrors(form) {
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.innerHTML = '';
    });
    
    const errorGroups = form.querySelectorAll('.has-error');
    errorGroups.forEach(group => {
        group.classList.remove('has-error');
    });
}
