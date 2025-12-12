// Seleccionar elementos
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle.querySelector('.icon');

/**
 * Cambiar el tema entre claro y oscuro
 */
function toggleTheme() {
    // Toggle clase dark-mode en body
    body.classList.toggle('dark-mode');
    
    // Determinar el tema actual
    const isDarkMode = body.classList.contains('dark-mode');
    
    // Cambiar icono
    icon.textContent = isDarkMode ? '☀️' : '🌙';
    
    // Guardar preferencia en localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Log para debugging
    console.log(`Tema cambiado a: ${isDarkMode ? 'Oscuro' : 'Claro'}`);
}

/**
 * Cargar tema guardado al inicio
 */
function loadTheme() {
    // Obtener tema guardado de localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Si hay un tema guardado y es oscuro, aplicarlo
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.textContent = '☀️';
    } else {
        // Tema claro por defecto
        body.classList.remove('dark-mode');
        icon.textContent = '🌙';
    }
    
    console.log(`Tema cargado: ${savedTheme || 'light (por defecto)'}`);
}

/**
 * BONUS: Detectar preferencia del sistema
 */
function detectSystemTheme() {
    // Solo si no hay preferencia guardada
    if (!localStorage.getItem('theme')) {
        // Verificar si el sistema prefiere modo oscuro
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            body.classList.add('dark-mode');
            icon.textContent = '☀️';
            console.log('Tema del sistema detectado: Oscuro');
        }
    }
}

// Event listener para el botón
themeToggle.addEventListener('click', toggleTheme);

// Atajos de teclado (opcional)
document.addEventListener('keydown', (e) => {
    // Ctrl + D para cambiar tema
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        toggleTheme();
    }
});

// Cargar tema al iniciar
loadTheme();

// (Opcional) Detectar preferencia del sistema
detectSystemTheme();

// Agregar animación al cambiar tema
themeToggle.addEventListener('click', () => {
    // Efecto de rotación al hacer clic
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 300);
});
