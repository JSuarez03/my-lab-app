# test_db.py
import pymysql
import bcrypt
from datetime import datetime

try:
    conn = pymysql.connect(host='localhost', user='root', password='', db='laboratorio_clinico')
    cursor = conn.cursor()
    # Insertar un usuario de prueba
    hashed = bcrypt.hashpw(b'MiPassword123', bcrypt.gensalt())
    cursor.execute("INSERT INTO users (full_name, email, password_hash, role, created_at) VALUES (%s, %s, %s, %s, %s)",
                   ("Test User", "test@example.com", hashed, "bioanalyst", datetime.now()))
    conn.commit()
    print("✅ Usuario insertado correctamente")
    conn.close()
except Exception as e:
    print("❌ Error:", e)