// Elementos del DOM
const timeDisplay = document.getElementById('time');
const periodDisplay = document.getElementById('period');
const dateDisplay = document.getElementById('date');
const greetingDisplay = document.getElementById('greeting');
const formatBtn = document.getElementById('formatBtn');
const formatText = document.getElementById('formatText');
const timezoneDisplay = document.getElementById('timezone');
const dayOfYearDisplay = document.getElementById('dayOfYear');
const weekNumberDisplay = document.getElementById('weekNumber');
const secondsTodayDisplay = document.getElementById('secondsToday');

// Estado: formato de 12h o 24h
let is24HourFormat = false;

/**
 * Actualizar el reloj
 */
function updateClock() {
    const now = new Date();
    
    // Obtener componentes de tiempo
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    // Determinar período (AM/PM)
    const period = hours >= 12 ? 'PM' : 'AM';
    
    // Convertir a formato 12h si es necesario
    if (!is24HourFormat) {
        hours = hours % 12 || 12; // Convertir 0 a 12
        periodDisplay.textContent = period;
        periodDisplay.style.display = 'block';
    } else {
        periodDisplay.style.display = 'none';
    }
    
    // Formatear con ceros a la izquierda
    const hoursStr = String(hours).padStart(2, '0');
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');
    
    // Mostrar tiempo
    timeDisplay.textContent = `${hoursStr}:${minutesStr}:${secondsStr}`;
    
    // Actualizar fecha
    updateDate(now);
    
    // Actualizar saludo
    updateGreeting(now.getHours());
    
    // Actualizar estadísticas
    updateStats(now);
}

/**
 * Actualizar la fecha
 */
function updateDate(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    const dateString = date.toLocaleDateString('es-ES', options);
    // Capitalizar primera letra
    dateDisplay.textContent = dateString.charAt(0).toUpperCase() + dateString.slice(1);
}

/**
 * Actualizar saludo según la hora
 */
function updateGreeting(hour) {
    let greeting;
    
    if (hour >= 5 && hour < 12) {
        greeting = '☀️ Buenos días';
    } else if (hour >= 12 && hour < 19) {
        greeting = '🌤️ Buenas tardes';
    } else {
        greeting = '🌙 Buenas noches';
    }
    
    greetingDisplay.textContent = greeting;
}

/**
 * Obtener zona horaria
 */
function getTimezone() {
    const offset = new Date().getTimezoneOffset();
    const hours = Math.abs(Math.floor(offset / 60));
    const minutes = Math.abs(offset % 60);
    const sign = offset <= 0 ? '+' : '-';
    
    return `UTC${sign}${hours}${minutes > 0 ? ':' + minutes : ''}`;
}

/**
 * Calcular día del año
 */
function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

/**
 * Calcular número de semana
 */
function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

/**
 * Calcular segundos transcurridos hoy
 */
function getSecondsToday(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    return (hours * 3600) + (minutes * 60) + seconds;
}

/**
 * Actualizar estadísticas
 */
function updateStats(date) {
    dayOfYearDisplay.textContent = getDayOfYear(date);
    weekNumberDisplay.textContent = getWeekNumber(date);
    secondsTodayDisplay.textContent = getSecondsToday(date).toLocaleString();
}

/**
 * Cambiar formato de 12h a 24h y viceversa
 */
function toggleFormat() {
    is24HourFormat = !is24HourFormat;
    
    if (is24HourFormat) {
        formatText.textContent = 'Cambiar a 12h';
    } else {
        formatText.textContent = 'Cambiar a 24h';
    }
    
    updateClock();
}

// Event Listener para cambiar formato
formatBtn.addEventListener('click', toggleFormat);

// Mostrar zona horaria
timezoneDisplay.textContent = getTimezone();

// Actualizar reloj inmediatamente
updateClock();

// Actualizar reloj cada segundo
setInterval(updateClock, 1000);

// Efecto de parpadeo en los dos puntos (opcional)
let blinkState = false;
setInterval(() => {
    blinkState = !blinkState;
    if (blinkState) {
        timeDisplay.style.opacity = '1';
    } else {
        timeDisplay.style.opacity = '0.95';
    }
}, 500);

// Log de inicio
console.log('⏰ Reloj digital iniciado');
console.log(`Zona horaria: ${getTimezone()}`);
console.log(`Formato: ${is24HourFormat ? '24 horas' : '12 horas'}`);
