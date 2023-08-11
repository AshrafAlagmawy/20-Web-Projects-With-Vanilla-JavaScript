'use strict';

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = `form-control error`;
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show input success message
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = `form-control success`;
}

// Function for getting the field name
const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// Function for check the required inputs
const checkRequired = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required !`);
    } else {
      showSuccess(input);
    }
  });
};

// Function for check the length of the input
const checkLength = (input, min, max) => {
  const length = input.value.length;
  if (length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters .`
    );
  } else if (length > max) {
    showError(
      input,
      `${getFieldName(input)} must be at most ${max} characters .`
    );
  } else {
    showSuccess(input);
  }
};

// To validate an email
const checkEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (regex.test(email.value.trim())) {
    showSuccess(email);
  } else {
    showError(email, 'Email is invalid !');
  }
};

// Check the similarity of the passwords
const checkPasswordsMatch = (password, confirmPassword) => {
  if (password.value !== confirmPassword.value) {
    showError(confirmPassword, 'Passwords are not match !');
  }
};

// Event Listener
form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkRequired([username, email, password, confirmPassword]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  checkLength(confirmPassword, 6, 20);
  checkEmail(email);
  checkPasswordsMatch(password, confirmPassword);
});
