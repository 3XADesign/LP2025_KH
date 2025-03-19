from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def principal():
    return render_template('principal.html')

@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/bingo')
def bingo():
    return render_template('bingo.html')

@app.route('/blackjack')  # ← Agregar esta ruta
def blackjack():
    return render_template('black.html')

if __name__ == '__main__':
    app.run(debug=True)