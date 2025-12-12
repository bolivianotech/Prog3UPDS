/* ===============================================
   CONTADOR INTERACTIVO - SOLUCIÓN COMPLETA
   ===============================================
   
   Funcionalidades:
   - Incrementar, decrementar y resetear contador
   - Cambio de color según valor (positivo/negativo/neutro)
   - Botones bonus para +5 y -5
   - Animaciones suaves
   - Persistencia con LocalStorage
   - Mensajes dinámicos
   
   Conceptos aplicados:
   - Selección de elementos del DOM
   - Event Listeners
   - Manipulación de contenido y estilos
   - Condicionales
   - LocalStorage
   =============================================== */

// ===== SELECCIÓN DE ELEMENTOS =====
const contadorElement = document.getElementById("contador");
const btnIncrementar = document.getElementById("btnIncrementar");
const btnDecrementar = document.getElementById("btnDecrementar");
const btnResetear = document.getElementById("btnResetear");
const btnIncrementar5 = document.getElementById("btnIncrementar5");
const btnDecrementar5 = document.getElementById("btnDecrementar5");
const mensajeElement = document.getElementById("mensaje");
const displayContador = document.querySelector(".contador-display");

// ===== VARIABLE DEL CONTADOR =====
// Intenta cargar el valor desde LocalStorage, si no existe usa 0
let contador = parseInt(localStorage.getItem("contador")) || 0;

// ===== FUNCIONES =====

/**
 * Actualiza el display del contador en el DOM
 * Cambia colores y clases según el valor
 */
function actualizarDisplay() {
  // Actualizar número
  contadorElement.textContent = contador;

  // Remover clases previas
  contadorElement.classList.remove("positivo", "negativo", "neutro");
  displayContador.classList.remove("bg-positivo", "bg-negativo", "bg-neutro");

  // Determinar estado y aplicar clases
  if (contador > 0) {
    contadorElement.classList.add("positivo");
    displayContador.classList.add("bg-positivo");
    actualizarMensaje("positivo");
  } else if (contador < 0) {
    contadorElement.classList.add("negativo");
    displayContador.classList.add("bg-negativo");
    actualizarMensaje("negativo");
  } else {
    contadorElement.classList.add("neutro");
    displayContador.classList.add("bg-neutro");
    actualizarMensaje("neutro");
  }

  // Guardar en LocalStorage
  localStorage.setItem("contador", contador);
}

/**
 * Actualiza el mensaje informativo según el estado
 * @param {string} estado - 'positivo', 'negativo' o 'neutro'
 */
function actualizarMensaje(estado) {
  let mensaje = "";

  switch (estado) {
    case "positivo":
      mensaje = `El contador está en <strong>positivo</strong> (+${contador})`;
      break;
    case "negativo":
      mensaje = `El contador está en <strong>negativo</strong> (${contador})`;
      break;
    case "neutro":
      mensaje = "El contador está en <strong>cero</strong>";
      break;
  }

  mensajeElement.innerHTML = mensaje;
}

/**
 * Incrementa el contador en una cantidad específica
 * @param {number} cantidad - Cantidad a incrementar (por defecto 1)
 */
function incrementar(cantidad = 1) {
  contador += cantidad;
  actualizarDisplay();
}

/**
 * Decrementa el contador en una cantidad específica
 * @param {number} cantidad - Cantidad a decrementar (por defecto 1)
 */
function decrementar(cantidad = 1) {
  contador -= cantidad;
  actualizarDisplay();
}

/**
 * Resetea el contador a 0
 */
function resetear() {
  contador = 0;
  actualizarDisplay();
}

// ===== EVENT LISTENERS =====

// Incrementar +1
btnIncrementar.addEventListener("click", () => {
  incrementar(1);
});

// Decrementar -1
btnDecrementar.addEventListener("click", () => {
  decrementar(1);
});

// Resetear a 0
btnResetear.addEventListener("click", resetear);

// Incrementar +5 (BONUS)
btnIncrementar5.addEventListener("click", () => {
  incrementar(5);
});

// Decrementar -5 (BONUS)
btnDecrementar5.addEventListener("click", () => {
  decrementar(5);
});

// BONUS: Atajos de teclado
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      incrementar(1);
      break;
    case "ArrowDown":
      decrementar(1);
      break;
    case "r":
    case "R":
      resetear();
      break;
    case "+":
      incrementar(5);
      break;
    case "-":
      decrementar(5);
      break;
  }
});

// ===== INICIALIZACIÓN =====
// Mostrar el valor inicial (puede venir de LocalStorage)
actualizarDisplay();

// Mensaje de bienvenida en consola
console.log("🎮 Contador Interactivo iniciado");
console.log("💡 Atajos de teclado:");
console.log("  ↑ : +1");
console.log("  ↓ : -1");
console.log("  + : +5");
console.log("  - : -5");
console.log("  R : Resetear");

/* ===============================================
   NOTAS EDUCATIVAS
   ===============================================
   
   1. SELECCIÓN DE ELEMENTOS:
      - getElementById(): Más rápido para IDs únicos
      - querySelector(): Más flexible, usa selectores CSS
   
   2. EVENT LISTENERS:
      - addEventListener('evento', función)
      - Separar lógica en funciones reutilizables
   
   3. MANIPULACIÓN DEL DOM:
      - textContent: Para texto simple (más seguro)
      - innerHTML: Para HTML (cuidado con XSS)
      - classList: Para manipular clases CSS
   
   4. CONDICIONALES:
      - if/else: Para lógica binaria o múltiple
      - switch: Para múltiples casos definidos
   
   5. LOCALSTORAGE:
      - localStorage.setItem('clave', 'valor')
      - localStorage.getItem('clave')
      - Solo almacena strings, usar parseInt() para números
   
   6. BUENAS PRÁCTICAS:
      - Nombres descriptivos de variables
      - Funciones pequeñas y enfocadas
      - Comentarios para código complejo
      - Separar lógica de presentación
   
   =============================================== */
