from myCrypto import app
from myCrypto.dataccess import DBmanager
from flask import jsonify, render_template, request
import sqlite3
from http import HTTPStatus    

dbManager = DBmanager(app.config.get('DATABASE'))

@app.route("/")
def listaMovimientos():
    return render_template('spa.html')


@app.route('/api/v1/movimientos')
def movimientosAPI():
    query = "SELECT * FROM movimientos_crypto ORDER BY fecha"
   
    try:
        lista = dbManager.consultaMuchasSQL(query) #Aqui va a devolver una lista, si no hay nada la devulve vacia, es una lista de diccionarios. Est ya seria el json 
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
                return jsonify({"status": "fail", "mensaje": "movimiento no encomtrado"}), 404 #Cuando creamos una api, Es importante poner el codigo 404 o en su defecto el HTTPStatus.NOT_FOUND si importamos previamente la libreria http y el modulo HTTPStatus cuando la petición no se encuentra 
    

        if request.method == 'POST':
            dbManager.modificaTablaSQL("""
            INSERT INTO movimientos_crypto 
                (fecha, hora, from, cantidad_inicial, to, cantidad_resultante) 
            VALUES (:fecha, :hora, :from, :cantidad_inicial, :to, :cantidad_resultante)
            """, request.json) #Aqui en este modificaTablaSQL creo primero las columnas de las campos donde van a ir los datos y luego le meto los valores a cada uno de los campos, los valores, que se han introducido en el formulario de detalle de movimientos en el navegador y lo envio con el metodo request en forma de json al servidor
    
            return jsonify({"status":"success", "mensaje": "Registro creado con éxito"}), HTTPStatus.CREATED
    
    except sqlite3.Error as e:
        print("error", e)
        return jsonify({"status":"fail", "mensaje": "Error en base de datos: {}".format(e)}), HTTPStatus.BAD_REQUEST