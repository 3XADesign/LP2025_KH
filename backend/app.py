from flask import Flask, render_template, jsonify
import random
import os

# Verificar la ruta del directorio actual
current_dir = os.path.dirname(__file__)
templates_path = os.path.join(current_dir, "templates")

print(f"Directorio actual: {current_dir}")
print(f"Ruta de templates: {templates_path}")

app = Flask(__name__, template_folder=templates_path)

# Función para lanzar los dados
def lanzar_dados(cantidad, caras):
    print(f"Lanzando {cantidad} dados de {caras} caras")
    resultados = [random.randint(1, caras) for _ in range(cantidad)]
    print(f"Resultados obtenidos: {resultados}")
    return resultados

@app.route('/')
def index():
    print("Renderizando index.html")
    return render_template('index.html')

@app.route('/lanzar/<int:cantidad>/<int:caras>')
@app.route('/lanzar/<int:cantidad>/<int:caras>')
def lanzar(cantidad, caras):
    print(f"Solicitud recibida: /lanzar/{cantidad}/{caras}")

    # Validar que los valores sean positivos
    if cantidad <= 0 or caras <= 0:
        return jsonify({'error': 'La cantidad de dados y las caras deben ser números positivos mayores a 0'}), 400

    resultados = lanzar_dados(cantidad, caras)
    return jsonify({'resultados': resultados})


if __name__ == '__main__':
    print("Iniciando servidor Flask...")
    app.run(debug=True)
