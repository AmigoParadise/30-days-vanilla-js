//DOM element
const form = document.getElementById('registrationForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const alertBox = document.getElementById('alertBox');

//function to show error state
//Adds 'error' class and removes 'success' class
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.classList.remove('success');
    formControl.classList.add('error');

    //change error message text
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//function to show SUCCESS state
//Adds 'success' class and removes 'error' class
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.classList.remove('error');
    formControl.classList.add('success');
}

//Username validation logic (minimum 3 character)
function validateUsername() {
    const value = username.value.trim();
    if (value === '') {
        showError(username, 'Username cannot be empty');
        return false;
    } else if (value.length < 3) {
        showError(username, 'Username must be at least 3 characters');
        return false;
    } else {
        showSuccess(username);
        return true;
    }
}

//email validation logic (using regular expression)
function validateEmail() {
    const value = email.value.trim();
    //Standard regex for common email patterns
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (value === '') {
        showError(email, 'Email cannot be empty');
        return false;
    } else if (!emailRegex.test(value)) {
        showError(email, 'Invalid email format');
        return false;
    } else {
        showSuccess(email);
        return true;
    }
}

//password validation logic (min 6 characters)
function validatePassword() {
    const value = password.value.trim();
    if (value === '') {
        showError(password, 'Password cannot be empty');
        return false;
    } else if (value.length < 6) {
        showError (password, 'password must be at least 6 characters');
        return false;
    } else {
        showSuccess(password);
        //Trigger confirm password validation again if password changes
        if (confirmPassword.valuea.trim() !== '') {
            validateConfirmPassword();
        }
        return true;
    }
}

//confirm password validation logic (must match)
function validateConfirmPassword() {
    const value = confirmPassword.value.trim();
    const pwdValue = password.value.trim();

    if (value === '') {
        showError(confirmPassword, 'Please confirm your password');
        return false;
    } else if (value !== pwdValue) {
        showError(confirmPassword, 'passwords do not match');
        return false;
    } else {
        showSuccess(confirmPassword);
        return true;
    }
}

//Event Listeners for Real-time Validation (As user types)
username.addEventListener('input', validateUsername);
email.addEventListener('input', validateEmail);
password.addEventListener('input', validatePassword);
confirmPassword.addEventListener('input', validateConfirmPassword);

//Event Listener for form submission
form.addEventListener('submit', function(e) {
    //Prevent default form submission to server
    e.preventDefault();

    //Run all validations simultaneously
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmValid = validateConfirmPassword();

    //Hide previous success message (if any)
    alertBox.classList.remove('show');

    //If all inputs return true (Valid)
    if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmValid) {
        //show success message
        alertBox.classList.add('show');
    }
})