from myCrypto import app
from myCrypto.dataccess import DBmanager
from flask import jsonify, render_template, request, Response
import requests
import sqlite3
from http import HTTPStatus    

dbManager = DBmanager(app.config.get('DATABASE'))



@app.route("/")
def listaMovimientos():
    return render_template('spa_crypto.html')


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
            dbManager.modificaTablaSQL("""
            INSERT INTO movimientos_crypto 
                (fecha, hora, moneda_from, cantidad_inicial, moneda_to, cantidad_resultante) 
            VALUES (:fecha, :hora, :moneda_from, :cantidad_inicial, :moneda_to, :cantidad_resultante)
            """, request.json) 
    
            return jsonify({"status":"success", "mensaje": "Registro creado con éxito"}), HTTPStatus.CREATED
    
    except sqlite3.Error as e:
        print("error", e)
        return jsonify({"status":"fail", "mensaje": "Error en base de datos: {}".format(e)}), HTTPStatus.BAD_REQUEST



@app.route('/api/v1/par/<_from>/<_to>/<quantity>')
@app.route('/api/v1/par/<_from>/<_to>')
def par(_from, _to, quantity = 1.0):
    url = f"https://pro-api.coinmarketcap.com/v1/tools/price-conversion?amount={quantity}&symbol={_from}&convert={_to}&CMC_PRO_API_KEY=b7f76ab2-bc37-48e1-a6e4-132fbb70df02"
    res = requests.get(url)
    return Response(res)
