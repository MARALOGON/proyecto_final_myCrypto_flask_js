import datetime
from myCrypto import app
from myCrypto.dataccess import DBmanager
from flask import jsonify, render_template, request, Response
import requests
import sqlite3
from http import HTTPStatus  
from datetime import datetime



DBPATH = app.config.get("DATABASE")

dbManager = DBmanager(DBPATH)




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
            if datos['moneda_from'] == datos['moneda_to']:
                return jsonify({"status": "fail", "mensaje": "No puedes seleccionar la misma moneda en ambos campos"})
            elif datos['cantidad_inicial'] <= "0":
                return jsonify({"status": "fail", "mensaje": "Debes introducir un importe numérico positivo para convertir"})
            elif datos['cantidad_inicial'] == "":
                return jsonify({"status": "fail", "mensaje": "Debes introducir un importe numérico positivo para convertir"})
            #elif datos['cantidad_inicial'] > "1000000000000":
                #return jsonify({"status": "fail", "mensaje": "Debes introducir un importe menor de 1000000000000 para convertir"})


            #Aqui hay que validar lo siguiente:
            
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
    url = f"https://pro-api.coinmarketcap.com/v1/tools/price-conversion?amount={quantity}&symbol={_from}&convert={_to}&CMC_PRO_API_KEY=77b090c5-07f3-4917-8927-ad9c5262a189"
    res = requests.get(url)
    return Response(res)
