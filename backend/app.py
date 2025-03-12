from flask import Flask, render_template, jsonify
import random
import os

app = Flask(__name__, template_folder=os.path.join(os.path.dirname(__file__), "templates"))

# Función para lanzar los dados
def lanzar_dados(cantidad, caras):
    return [random.randint(1, caras) for _ in range(cantidad)]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/lanzar/<int:cantidad>/<int:caras>')
def lanzar(cantidad, caras):
    resultados = lanzar_dados(cantidad, caras)
    return jsonify({'resultados': resultados})

if __name__ == '__main__':
    app.run(debug=True)
