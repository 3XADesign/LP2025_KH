from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/bingo')
def bingo():
    return render_template('bingo.html')

if __name__ == '__main__':
    app.run(debug=True)