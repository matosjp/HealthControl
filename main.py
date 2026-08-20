import sqlite3
import json
import os

DB_NAME = 'saude.db'

def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def criar_banco_de_dados():
    conn = get_db_connection()
    c = conn.cursor()

    # Tabela de Alimentos
    c.execute('''CREATE TABLE IF NOT EXISTS alimentos (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nome TEXT NOT NULL,
                    calorias INTEGER NOT NULL,
                    proteinas REAL DEFAULT 0,
                    carboidratos REAL DEFAULT 0,
                    gorduras REAL DEFAULT 0,
                    slot TEXT DEFAULT 'breakfast',
                    qty INTEGER DEFAULT 1
                )''')

    # Tabela de Dietas
    c.execute('''CREATE TABLE IF NOT EXISTS dietas (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    objetivo TEXT DEFAULT 'perda_peso',
                    nome TEXT NOT NULL,
                    descricao TEXT NOT NULL
                )''')

    # Tabela de Exercícios
    c.execute('''CREATE TABLE IF NOT EXISTS exercicios (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    objetivo TEXT DEFAULT 'perda_peso',
                    nome TEXT NOT NULL,
                    calorias_queimadas INTEGER NOT NULL
                )''')

    # Tabela de Metas do Usuário
    c.execute('''CREATE TABLE IF NOT EXISTS metas (
                    id INTEGER PRIMARY KEY,
                    gasto_calorico INTEGER DEFAULT 2000,
                    peso_atual REAL DEFAULT 75.0,
                    peso_meta REAL DEFAULT 65.0,
                    agua_meta INTEGER DEFAULT 3500,
                    objetivo TEXT DEFAULT 'perda_peso'
                )''')

    # Seed dados.json se tabelas estiverem vazias
    c.execute("SELECT COUNT(*) FROM dietas")
    if c.fetchone()[0] == 0 and os.path.exists('dados.json'):
        try:
            with open('dados.json', 'r', encoding='utf-8') as f:
                data = json.load(f)
                for obj, diet_list in data.get('dietas', {}).items():
                    for d in diet_list:
                        c.execute("INSERT INTO dietas (objetivo, nome, descricao) VALUES (?, ?, ?)",
                                  (obj, d['nome'], d['descricao']))
                for obj, ex_list in data.get('exercicios', {}).items():
                    for ex in ex_list:
                        c.execute("INSERT INTO exercicios (objetivo, nome, calorias_queimadas) VALUES (?, ?, ?)",
                                  (obj, ex['nome'], ex['calorias_queimadas']))
        except Exception as e:
            print(f"Erro ao popular dados iniciais: {e}")

    conn.commit()
    conn.close()

def adicionar_alimento(nome, calorias, proteinas=0, carboidratos=0, gorduras=0, slot='breakfast', qty=1):
    conn = get_db_connection()
    c = conn.cursor()
    c.execute("INSERT INTO alimentos (nome, calorias, proteinas, carboidratos, gorduras, slot, qty) VALUES (?, ?, ?, ?, ?, ?, ?)",
              (nome, calorias, proteinas, carboidratos, gorduras, slot, qty))
    conn.commit()
    new_id = c.lastrowid
    conn.close()
    return new_id

def listar_alimentos():
    conn = get_db_connection()
    c = conn.cursor()
    c.execute("SELECT * FROM alimentos")
    rows = [dict(row) for row in c.fetchall()]
    conn.close()
    return rows

def calcular_calorias(refeicao):
    conn = get_db_connection()
    c = conn.cursor()
    total_calorias = 0
    for alimento in refeicao:
        c.execute("SELECT calorias FROM alimentos WHERE nome=?", (alimento,))
        resultado = c.fetchone()
        if resultado:
            total_calorias += resultado['calorias']
    conn.close()
    return total_calorias

def sugerir_dieta_e_exercicio(objetivo='perda_peso'):
    conn = get_db_connection()
    c = conn.cursor()
    c.execute("SELECT nome, descricao FROM dietas WHERE objetivo=? ORDER BY RANDOM() LIMIT 1", (objetivo,))
    dieta = c.fetchone()
    
    c.execute("SELECT nome, calorias_queimadas FROM exercicios WHERE objetivo=? ORDER BY RANDOM() LIMIT 1", (objetivo,))
    exercicio = c.fetchone()
    
    conn.close()
    return dict(dieta) if dieta else None, dict(exercicio) if exercicio else None

if __name__ == '__main__':
    criar_banco_de_dados()
    print("Banco de dados SQLite saude.db inicializado e verificado com sucesso!")