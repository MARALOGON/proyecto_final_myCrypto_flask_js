import datetime
from myCrypto import app
from myCrypto.dataccess import DBmanager
from flask import jsonify, render_template, request, Response
import requests
import sqlite3
from http import HTTPStatus  
from datetime import datetime





dbManager = DBmanager(app.config.get('DATABASE'))




@app.route("/")
def listaMovimientos():
    
    return render_template('spa_crypto.html')
    

@app.route('/api/v1/saldos')
def saldosCrypto():
    #query = "SELECT moneda_to, moneda_from, cantidad_resultante - SUM(cantidad_inicial) AS total_saldos FROM movimientos_crypto WHERE moneda_to = moneda_from GROUP BY moneda_to"SUM(cantidad_inicial) AS total_saldos_from FROM movimientos_crypto GROUP BY moneda_from
    query = "SELECT moneda_to, moneda_from, SUM(cantidad_resultante) AS total_saldos_to, SUM(cantidad_inicial) AS total_saldos_from FROM movimientos_crypto GROUP BY moneda_from "
    

    try:
        saldos = dbManager.consultaMuchasSQL(query)
        return jsonify({'status': 'success', 'movimientos_crypto':saldos})

    except sqlite3.Error as e:
        return jsonify({'status': 'fail', 'mensaje': str(e)})
    
    


@app.route('/api/v1/movimientos')
def movimientosAPI():
    query = "SELECT * FROM movimientos_crypto ORDER BY fecha"

    try:
        lista = dbManager.consultaMuchasSQL(query) 
        return jsonify({'status': 'success', 'movimientos_crypto':lista})

    except sqlite3.Error as e:
        return jsonify({'status': 'fail', 'mensaje': str(e)})

        





@app.route('/api/v1/movimiento/<int:id>', methods=['GET'])
@app.route('/api/v1/movimiento', methods=['POST'])
def muestraMovimientoId(id=None):
    ahora = datetime.now()
    movimiento = dbManager.consultaUnaSQL("SELECT * FROM movimientos_crypto WHERE id = ?", [id])
    try:
        if request.method == 'GET':
            if movimiento:
                return jsonify({
                    "status": "success", 
                    "data": movimiento
                })
            else:
                return jsonify({"status": "fail", "mensaje": "movimiento no encomtrado"}), 404 
    

        if request.method == 'POST':
            datos = request.json
            datos["fecha"] = ahora.strftime("%Y-%m-%d")
            datos["hora"] = ahora.strftime("%H:%M:%S")

            #Aqui hay que validar lo siguiente:
            #1. Que moneda_from y moneda_to son distintas
            #2. Que de cantidad_from en criptos hay saldo suficiente

            dbManager.modificaTablaSQL("""
            INSERT INTO movimientos_crypto 
                (fecha, hora, moneda_from, cantidad_inicial, moneda_to, cantidad_resultante) 
            VALUES (:fecha, :hora, :moneda_from, :cantidad_inicial, :moneda_to, :cantidad_resultante)
            """, datos) 
            print("enviado: {}".format(datos))
    
            return jsonify({"status":"success", "mensaje": "Compra realizada con éxito"}), HTTPStatus.CREATED
    
    except sqlite3.Error as e:
        print("error", e)
        return jsonify({"status":"fail", "mensaje": "Error en base de datos: {}".format(e)}), HTTPStatus.BAD_REQUEST




@app.route('/api/v1/par/<_from>/<_to>/<quantity>')
@app.route('/api/v1/par/<_from>/<_to>')
def par(_from, _to, quantity = 1.0):
    url = f"https://pro-api.coinmarketcap.com/v1/tools/price-conversion?amount={quantity}&symbol={_from}&convert={_to}&CMC_PRO_API_KEY=b7f76ab2-bc37-48e1-a6e4-132fbb70df02"
    res = requests.get(url)
    return Response(res)
