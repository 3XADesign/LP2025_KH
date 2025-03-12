import random

def tirar_dado():
    # Genera un número aleatorio entre 1 y 6
    valor = random.randint(1, 6)
    return valor

def main():
    while True:
        input("Presiona Enter para lanzar el dado...")
        resultado = tirar_dado()
        print(f"El resultado del dado es: {resultado}")
        
        otra = input("¿Quieres lanzar el dado nuevamente? (s/n): ")
        if otra.lower() != 's':
            break

if __name__ == "__main__":
    main()
