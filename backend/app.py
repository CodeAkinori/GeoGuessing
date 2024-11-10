from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import random
import os

app = Flask(__name__)
CORS(app)

FLAG_PATH = os.path.join(os.getcwd(), "img")

flags = [
    {"country": "Brasil", "file_name": "BR.gif"},
    {"country": "Canadá", "file_name": "CA.gif"},
    {"country": "Japão", "file_name": "JP.gif"}
]

@app.route('/get_flag', methods=['GET'])
def get_flag():
    flag = random.choice(flags)
    flag_url = f"/img/{flag['file_name']}"
    return jsonify({"flag_url": flag_url, "country": flag["country"]})

@app.route('/check_answer', methods=['POST'])
def check_answer():
    data = request.get_json()
    answer = data.get("answer", "").strip().lower()
    country = data.get("country", "").strip().lower()
    
    if answer == country:
        return jsonify({"result": "correct"})
    else:
        return jsonify({"result": "incorrect"})

# Endpoint para servir as imagens da pasta img
@app.route('/img/<path:filename>')
def serve_image(filename):
    return send_from_directory(FLAG_PATH, filename)

if __name__ == '__main__':
    app.run(debug=True)
