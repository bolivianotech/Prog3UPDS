// Elementos del formulario
const form = document.getElementById('registrationForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const age = document.getElementById('age');
const terms = document.getElementById('terms');
const submitBtn = document.getElementById('submitBtn');
const formSummary = document.getElementById('formSummary');

// Elementos de requisitos de contraseña
const reqLength = document.getElementById('req-length');
const reqUppercase = document.getElementById('req-uppercase');
const reqNumber = document.getElementById('req-number');

/**
 * Validar un campo individual
 */
function validateField(field) {
    const value = field.value.trim();
    const formGroup = field.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    let isValid = true;
    let message = '';
    
    // Validaciones según el campo
    switch(field.id) {
        case 'username':
            if (value.length === 0) {
                message = 'El nombre de usuario es obligatorio';
                isValid = false;
            } else if (value.length < 3) {
                message = 'El nombre debe tener al menos 3 caracteres';
                isValid = false;
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value.length === 0) {
                message = 'El correo electrónico es obligatorio';
                isValid = false;
            } else if (!emailRegex.test(value)) {
                message = 'Ingresa un correo electrónico válido';
                isValid = false;
            }
            break;
            
        case 'password':
            if (value.length === 0) {
                message = 'La contraseña es obligatoria';
                isValid = false;
            } else if (value.length < 8) {
                message = 'La contraseña debe tener al menos 8 caracteres';
                isValid = false;
            } else if (!/[A-Z]/.test(value)) {
                message = 'Debe contener al menos una mayúscula';
                isValid = false;
            } else if (!/[0-9]/.test(value)) {
                message = 'Debe contener al menos un número';
                isValid = false;
            }
            // Actualizar requisitos visuales
            updatePasswordRequirements(value);
            break;
            
        case 'confirmPassword':
            if (value.length === 0) {
                message = 'Confirma tu contraseña';
                isValid = false;
            } else if (value !== password.value) {
                message = 'Las contraseñas no coinciden';
                isValid = false;
            }
            break;
            
        case 'age':
            const ageValue = parseInt(value);
            if (value.length === 0) {
                message = 'La edad es obligatoria';
                isValid = false;
            } else if (isNaN(ageValue) || ageValue < 18) {
                message = 'Debes ser mayor de 18 años';
                isValid = false;
            } else if (ageValue > 120) {
                message = 'Ingresa una edad válida';
                isValid = false;
            }
            break;
    }
    
    // Aplicar clases y mostrar/ocultar mensajes
    if (isValid) {
        formGroup.classList.remove('error');
        formGroup.classList.add('valid');
        field.classList.remove('invalid');
        field.classList.add('valid');
        errorMessage.textContent = '';
    } else {
        formGroup.classList.remove('valid');
        formGroup.classList.add('error');
        field.classList.remove('valid');
        field.classList.add('invalid');
        errorMessage.textContent = message;
    }
    
    return isValid;
}

/**
 * Actualizar indicadores visuales de requisitos de contraseña
 */
function updatePasswordRequirements(password) {
    // Longitud
    if (password.length >= 8) {
        reqLength.classList.add('met');
    } else {
        reqLength.classList.remove('met');
    }
    
    // Mayúscula
    if (/[A-Z]/.test(password)) {
        reqUppercase.classList.add('met');
    } else {
        reqUppercase.classList.remove('met');
    }
    
    // Número
    if (/[0-9]/.test(password)) {
        reqNumber.classList.add('met');
    } else {
        reqNumber.classList.remove('met');
    }
}

/**
 * Validar checkbox de términos
 */
function validateTerms() {
    const formGroup = terms.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    if (terms.checked) {
        formGroup.classList.remove('error');
        errorMessage.textContent = '';
        return true;
    } else {
        formGroup.classList.add('error');
        errorMessage.textContent = 'Debes aceptar los términos y condiciones';
        return false;
    }
}

/**
 * Verificar si el formulario completo es válido
 */
function checkFormValidity() {
    const isUsernameValid = username.classList.contains('valid');
    const isEmailValid = email.classList.contains('valid');
    const isPasswordValid = password.classList.contains('valid');
    const isConfirmValid = confirmPassword.classList.contains('valid');
    const isAgeValid = age.classList.contains('valid');
    const areTermsChecked = terms.checked;
    
    const isFormValid = isUsernameValid && isEmailValid && isPasswordValid && 
                        isConfirmValid && isAgeValid && areTermsChecked;
    
    // Habilitar/deshabilitar botón de envío
    submitBtn.disabled = !isFormValid;
    
    return isFormValid;
}

// Event listeners para validación en tiempo real
username.addEventListener('input', () => {
    validateField(username);
    checkFormValidity();
});

username.addEventListener('blur', () => validateField(username));

email.addEventListener('input', () => {
    validateField(email);
    checkFormValidity();
});

email.addEventListener('blur', () => validateField(email));

password.addEventListener('input', () => {
    validateField(password);
    // Revalidar confirmación si existe
    if (confirmPassword.value) {
        validateField(confirmPassword);
    }
    checkFormValidity();
});

confirmPassword.addEventListener('input', () => {
    validateField(confirmPassword);
    checkFormValidity();
});

age.addEventListener('input', () => {
    validateField(age);
    checkFormValidity();
});

age.addEventListener('blur', () => validateField(age));

terms.addEventListener('change', () => {
    validateTerms();
    checkFormValidity();
});

// Manejo del envío del formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validar todos los campos una vez más
    const isUsernameValid = validateField(username);
    const isEmailValid = validateField(email);
    const isPasswordValid = validateField(password);
    const isConfirmValid = validateField(confirmPassword);
    const isAgeValid = validateField(age);
    const areTermsValid = validateTerms();
    
    if (isUsernameValid && isEmailValid && isPasswordValid && 
        isConfirmValid && isAgeValid && areTermsValid) {
        
        // Mostrar resumen
        formSummary.innerHTML = `
            <h3>✓ ¡Registro Exitoso!</h3>
            <p><strong>Usuario:</strong> ${username.value}</p>
            <p><strong>Email:</strong> ${email.value}</p>
            <p><strong>Edad:</strong> ${age.value} años</p>
            <p>Los datos se han validado correctamente.</p>
        `;
        formSummary.classList.add('show');
        
        console.log('Formulario enviado:', {
            username: username.value,
            email: email.value,
            age: age.value
        });
        
        // Limpiar formulario después de 3 segundos
        setTimeout(() => {
            form.reset();
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('valid', 'error');
            });
            document.querySelectorAll('input').forEach(input => {
                input.classList.remove('valid', 'invalid');
            });
            formSummary.classList.remove('show');
            submitBtn.disabled = true;
        }, 3000);
    }
});
