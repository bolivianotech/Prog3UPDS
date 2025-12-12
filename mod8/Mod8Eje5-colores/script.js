// Elementos del DOM
const body = document.body;
const colorCode = document.getElementById('colorCode');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const historyGrid = document.getElementById('historyGrid');
const clearHistoryBtn = document.getElementById('clearHistory');
const rgbValue = document.getElementById('rgbValue');
const hslValue = document.getElementById('hslValue');
const toast = document.getElementById('toast');

// Array para guardar historial de colores
let colorHistory = JSON.parse(localStorage.getItem('colorHistory')) || [];

/**
 * Generar un color hexadecimal aleatorio
 */
function generateRandomColor() {
    // Método 1: Generar directamente en hexadecimal
    const letters = '0123456789ABCDEF';
    let color = '#';
    
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    
    return color;
}

/**
 * Convertir HEX a RGB
 */
function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Convertir HEX a HSL
 */
function hexToHsl(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    
    return `hsl(${h}, ${s}%, ${l}%)`;
}

/**
 * Aplicar un color
 */
function applyColor(color) {
    // Cambiar fondo del body
    body.style.backgroundColor = color;
    
    // Mostrar código
    colorCode.textContent = color;
    
    // Mostrar conversiones
    rgbValue.textContent = hexToRgb(color);
    hslValue.textContent = hexToHsl(color);
    
    // Agregar al historial
    addToHistory(color);
    
    // Animación del botón
    generateBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        generateBtn.style.transform = '';
    }, 100);
}

/**
 * Agregar color al historial
 */
function addToHistory(color) {
    // Evitar duplicados consecutivos
    if (colorHistory[0] === color) return;
    
    // Agregar al inicio del array
    colorHistory.unshift(color);
    
    // Limitar a 12 colores
    if (colorHistory.length > 12) {
        colorHistory = colorHistory.slice(0, 12);
    }
    
    // Guardar en localStorage
    localStorage.setItem('colorHistory', JSON.stringify(colorHistory));
    
    // Renderizar historial
    renderHistory();
}

/**
 * Renderizar historial de colores
 */
function renderHistory() {
    historyGrid.innerHTML = '';
    
    colorHistory.forEach(color => {
        const item = document.createElement('div');
        item.className = 'history-item';
        item.style.backgroundColor = color;
        item.setAttribute('data-color', color);
        item.textContent = color;
        
        // Click para aplicar ese color
        item.addEventListener('click', () => {
            applyColor(color);
        });
        
        historyGrid.appendChild(item);
    });
}

/**
 * Copiar código al portapapeles
 */
async function copyToClipboard() {
    const color = colorCode.textContent;
    
    try {
        await navigator.clipboard.writeText(color);
        showToast('✓ Código copiado al portapapeles');
    } catch (err) {
        // Fallback para navegadores antiguos
        const textArea = document.createElement('textarea');
        textArea.value = color;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('✓ Código copiado');
    }
}

/**
 * Mostrar notificación toast
 */
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

/**
 * Limpiar historial
 */
function clearHistory() {
    if (confirm('¿Estás seguro de que quieres limpiar el historial?')) {
        colorHistory = [];
        localStorage.removeItem('colorHistory');
        renderHistory();
        showToast('✓ Historial limpiado');
    }
}

// Event Listeners
generateBtn.addEventListener('click', () => {
    const newColor = generateRandomColor();
    applyColor(newColor);
});

copyBtn.addEventListener('click', copyToClipboard);

// Click en el código para copiar
colorCode.addEventListener('click', copyToClipboard);

clearHistoryBtn.addEventListener('click', clearHistory);

// Atajo de teclado: Barra espaciadora para generar
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        const newColor = generateRandomColor();
        applyColor(newColor);
    }
});

// Cargar historial al inicio
renderHistory();

// Aplicar color inicial si hay historial
if (colorHistory.length > 0) {
    body.style.backgroundColor = colorHistory[0];
    colorCode.textContent = colorHistory[0];
    rgbValue.textContent = hexToRgb(colorHistory[0]);
    hslValue.textContent = hexToHsl(colorHistory[0]);
}
