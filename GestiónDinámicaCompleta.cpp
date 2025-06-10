#include <iostream> // Para std::cout, std::endl

int main() {
    // 1. Asignar memoria para un solo entero
    int *p_entero = nullptr; // Siempre inicializar punteros
    p_entero = new int;      // Solicita memoria en el Heap para un int
    
    if (p_entero != nullptr) { // Buena práctica: verificar si new tuvo éxito (aunque suele lanzar excepción)
        *p_entero = 123;     // Asigna un valor a la memoria recién reservada
        std::cout << "Entero dinamico creado. Valor: " << *p_entero 
                  << " en direccion: " << p_entero << std::endl;
        
        delete p_entero;     // Libera la memoria
        p_entero = nullptr;  // ¡Buena práctica! Evita puntero colgante.
        std::cout << "Memoria del entero dinamico liberada." << std::endl;
    } else {
        std::cout << "ERROR: No se pudo asignar memoria para p_entero." << std::endl;
    }

    // 2. Asignar memoria para un arreglo de doubles
    std::cout << "\n--- Arreglo Dinamico ---" << std::endl;
    double *p_arreglo_doubles = nullptr;
    int tamano_arreglo = 5;
    p_arreglo_doubles = new double[tamano_arreglo]; // Solicita memoria para 5 doubles

    if (p_arreglo_doubles != nullptr) {
        for (int i = 0; i < tamano_arreglo; ++i) {
            p_arreglo_doubles[i] = i * 1.5; // Asigna valores al arreglo
        }
        
        std::cout << "Arreglo dinamico creado y llenado:" << std::endl;
        for (int i = 0; i < tamano_arreglo; ++i) {
            std::cout << "p_arreglo_doubles[" << i << "] = " << p_arreglo_doubles[i] 
                      << " en dir: " << (p_arreglo_doubles + i) << std::endl;
        }
        
        delete[] p_arreglo_doubles; // ¡IMPORTANTE! Usar delete[] para arreglos
        p_arreglo_doubles = nullptr;  // Buena práctica
        std::cout << "Memoria del arreglo dinamico liberada." << std::endl;
    } else {
        std::cout << "ERROR: No se pudo asignar memoria para p_arreglo_doubles." << std::endl;
    }
    
    // Intentar usar un puntero nulo (solo para demostrar, usualmente causa error o comportamiento indefinido)
    // if (p_entero == nullptr) {
    //    std::cout << "\np_entero es ahora nullptr." << std::endl;
    //    // *p_entero = 789; // ¡Esto causaría un error de segmentación! (Descomentar con precaución)
    // }

    return 0;
}