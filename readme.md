# Instalación y funcionamiento

1. Instalar las dependencias del fichero requirements.txt
pip install -r requirements.txt

2.  Crear el entorno virtual con python3 -m venv venv

3. Activa el entorno virtual con . venv/bin/activate (Mac) o 
. venv/Scripts/activate (Windows)

4. Instalar -dotenv con pip install python-dotenv

5. Crear el fichero .env en el directorio raiz, duplicar y renombrar a .env_template
Los valores deben ser:
- FLASK_APP=run.py
- FLASK_ENV=el que se quiera

6. Crear el fichero config.py con la ruta a base de datos. Duplicar y renombrar a config_template.py

7. Crear base de datos con DBBrowser. Crear carpeta "data" en el fichero raiz y guardar dentro el archivo .db generado con la creacion de la base de datos.

CREATE TABLE "movimientos_crypto" (
	"id"	INTEGER,
	"fecha"	TEXT NOT NULL,
	"hora"	TEXT NOT NULL,
	"moneda_from"	TEXT NOT NULL,
	"cantidad_inicial"	REAL NOT NULL,
	"moneda_to"	TEXT NOT NULL,
	"cantidad_resultante"	REAL NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);

8. Ejecutar flask run



