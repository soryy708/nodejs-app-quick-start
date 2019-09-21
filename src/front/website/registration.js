import apiCall from './apiCall';

const registrationErrors = {
    'validation/password': 'Password is invalid',
    'validation/email': 'Email is invalid',
    'auth/existence': 'User with this email already exists',
    'generic': 'Unknown error occurred',
};

function registrationSubmit(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const pass1 = document.getElementById('password1').value;
    const pass2 = document.getElementById('password2').value;
    const errorContainer = document.getElementById('errorContainer');

    let error = '';
    if (!email) {
        error += 'Email is required\n';
    }
    if (!pass1 || !pass2) {
        error += 'Password is required\n';
    }
    if (pass1 !== pass2) {
        error += 'Passwords don\'t match\n';
    }
    errorContainer.innerText = error;
    if (error !== '') {
        errorContainer.style.display = 'inline-block';
        return false;
    }
    errorContainer.style.display = 'none';

    const redirectTimeoutDuration = 3000; // ms
    apiCall('post', 'user/register', {
        email: email,
        password: pass1,
    })
        .then(() => {
            const successContainer = document.getElementById('successContainer');
            successContainer.style.display = 'inline-block';
            successContainer.innerText = 'Success. Redirecting you now . . .';
            setTimeout(() => {
                window.location.href = ''; // TODO
            }, redirectTimeoutDuration);
        })
        .catch((res) => {
            const callError = res.body || res;
            errorContainer.style.display = 'inline-block';
            errorContainer.innerText = registrationErrors[callError] || callError;
        });
    
    return false;
}

const form = document.getElementById('registrationForm');
form.addEventListener('submit', registrationSubmit);
