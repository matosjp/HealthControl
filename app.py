import os
from flask import Flask, jsonify, request, send_from_directory

app = Flask(__name__, static_folder='.', static_url_path='')

# In-memory fallback if needed
alimentos = []

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('.', path)

@app.route('/api/alimentos', methods=['GET'])
def get_alimentos():
    return jsonify(alimentos), 200

@app.route('/api/adicionar_alimento', methods=['POST'])
def adicionar_alimento():
    data = request.get_json() or {}
    alimentos.append(data)
    return jsonify({"message": "Alimento adicionado com sucesso!", "data": data}), 201

@app.route('/api/calcular_calorias', methods=['POST'])
def calcular_calorias():
    data = request.get_json() or {}
    refeicao = data.get('refeicao', [])
    total_calorias = sum(item.get('calorias', 0) for item in alimentos if item.get('nome') in refeicao)
    return jsonify({"total_calorias": total_calorias}), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"HealthControl Server running at http://localhost:{port}")
    app.run(debug=True, host='0.0.0.0', port=port)