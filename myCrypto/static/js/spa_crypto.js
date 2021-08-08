const criptomonedas = { 
    EUR: 'Euro',
    BTC: 'Bitcoin',
    ETH: 'Ethereum',
    LTC: 'Litecoin',
    XRP: 'Ripple',
    BCH: 'Bitcoin Cash',
    BNB: 'Binance Coin',
    USDT: 'Tether',
    EOS: 'Eos',
    BSV: 'Bitcoin SV',
    XLM: 'Stellar',
    ADA: 'Cardano',
    TRX: 'Tron',
    EGLD:'Elrond',
    SOL: 'Solana',
    XOR: 'Sora',
    DOT: 'Polkadot',
    ORN: 'Orion Protocol',
    LINK: 'Chainlink', 
    MATIC: 'Polygon'

}

let losMovimientos = {}



function listaMovimientos() { 
    if (this.readyState === 4 && this.status === 200) {   
        const respuesta = JSON.parse(this.responseText) 
        
        if (respuesta.status !== "success") {
            alert("Error en la consulta de movimientos registrados")
            return
        }

        
        //losMovimientos = respuesta.movimientos_crypto
        
        
        


        
        
        //tbody.innerHTML = "" 

        for (let i=0; i < respuesta.movimientos_crypto.length; i++) { 
            const movimiento = respuesta.movimientos_crypto[i] 
            
            const fila = document.createElement("tr")


            const datos = `
                <td>${movimiento.fecha}</td>
                <td>${movimiento.hora}</td>
                <td>${movimiento.moneda_from}</td> 
                <td>${movimiento.cantidad_inicial}</td>
                <td>${movimiento.moneda_to}</td>
                <td>${movimiento.cantidad_resultante}</td>
            `
            fila.innerHTML = datos 
            const tbody = document.querySelector(".table tbody") 
            tbody.appendChild(fila) //Se ubica dentro de cada fila que se crea, de cada <tr>
        
        }

    }
}





function llamaApiMovimientos() { 
    xhr = new XMLHttpRequest() 
    xhr.onload = listaMovimientos 
    xhr.open('GET', `http://localhost:5000/api/v1/movimientos`, true) 
    xhr.send()
}

function listaSaldos() {
    if (this.readyState === 4 && this.status === 200) {   
        const respuesta = JSON.parse(this.responseText) 
        
        
        if (respuesta.status !== "success") {
            alert("Se ha producido un error en la consulta de saldos")
            return
        }
    
    const movimientos = respuesta.movimientos_crypto
    for (var i=0; i < respuesta.movimientos_crypto.length; i++) { 
        const myList = document.createElement('ul')
        const monedas_to = movimientos[i].moneda_to
        const saldos_to = movimientos[i].cantidad_resultante
        
        let cantidades_to = {}

        for (const moneda of movimientos) {
            if (cantidades_to[moneda]) {
                cantidades_to[moneda] += cantidad_resultante
            } 
            //console.log(cantidades_to)
            
        }
        

        for (var x = 0; x < monedas_to.length; x++) {
            const listItem = document.createElement('li')
            listItem.textContent = monedas_to[x]
            //listItem.textContent = monedas_to[x]
            myList.appendChild(listItem)
        }
        console.log(monedas_to)

        for (var y = 0; y < saldos_to.length; y++) {
            const listItem = document.createElement('li')
            listItem.textContent = saldos_to[y]
            myList.appendChild(listItem)
        }
        console.log(saldos_to)
    }
        
        

    }

}



function llamaApiSaldos(){
    xhr4 = new XMLHttpRequest() 
    xhr4.open('GET', `http://localhost:5000/api/v1/movimientos`, true) 
    xhr4.onload = listaSaldos
    xhr4.send()
}

function capturaFormCompra() { 
    //var hoy = new Date()
    //var hora_actual = new Date()
    const movimiento = {}
    //movimiento.fecha = String(hoy.getFullYear()) + '-' + ("0" + (hoy.getMonth() + 1)).slice(-2) + '-' + ("0" + (hoy.getDate())).slice(-2)
    //movimiento.hora = String("0" + (hora_actual.getHours())).slice(-2) + ':' + ("0" + (hora_actual.getMinutes())).slice(-2) + ':' + ("0" + (hora_actual.getSeconds())).slice(-2)
    movimiento.moneda_from = document.querySelector("#moneda_from").value 
    movimiento.cantidad_inicial = document.querySelector("#cantidad_inicial").value
    //movimiento.cantidad_inicial_oculta = document.querySelector("#cantidad_inicial_oculta").value
    movimiento.moneda_to = document.querySelector("#moneda_to").value
    movimiento.cantidad_resultante = document.querySelector("#cantidad_resultante").value
   
    return movimiento 

}

function limpiaForm(capturaFormCompra) {
  var campos = capturaFormCompra.elements;

  capturaFormCompra.reset();

  for(i=0; i<campos.length; i++) {

    field_type = campos[i].type.toLowerCase();

    switch(field_type) {
      case "fecha":
      case "hora":
      case "cantidad_inicial":
      case "cantidad_inicial_oculta":
      case "cantidad_resultante":
        campos[i].value = "";
        break;


      case "moneda_from":
      case "moneda_to":
        campos[i].selectedIndex = -1;
        break;

      default:
        break;
    }
  }
}



function validarConversion() {
    var moneda_from = document.getElementById("moneda_from").value;
    var moneda_to = document.getElementById("moneda_to").value;
    var cantidad_inicial = document.getElementById("cantidad_inicial").value;
    if (moneda_from === moneda_to) {
        alert("No puedes seleccionar la misma moneda en los campos From y To")
        document.getElementById("moneda_to").focus();
        return false

    } else if (!cantidad_inicial) { 
        alert("Debes introducir un importe para convertir")
        document.getElementById("cantidad_inicial").focus();
        return false

   
    } else if (cantidad_inicial <= 0) {
        alert("Debes introducir un importe superior a 0 para convertir")
        document.getElementById("cantidad_inicial").focus();
        return false

    } else if (cantidad_inicial > 1000000000000) {
        alert("Debes introducir un importe menor de 1000000000000 para convertir")
        document.getElementById("cantidad_inicial").focus();
        return false
    }

    return true
}


function validarCompra() {
    var cantidad_inicial = document.getElementById("cantidad_inicial").value;
    var cantidad_inicial_oculta = document.getElementById("cantidad_inicial_oculta").value;
    var cantidad_resultante = document.getElementById("cantidad_resultante").value;
    var moneda_to = document.getElementById("moneda_to").value;
    var moneda_to_oculta = document.getElementById("moneda_to_oculta").value;
    var moneda_from = document.getElementById("moneda_from").value;
    var moneda_from_oculta = document.getElementById("moneda_from_oculta").value;

    if (cantidad_inicial != cantidad_inicial_oculta) {
        alert("No puedes modificar el importe a convertir")
        document.getElementById("cantidad_inicial").focus()
        return false
    }

    if (moneda_to != moneda_to_oculta) {
        alert("No puedes cambiar la moneda seleccionada si quieres hacer la compra")
        document.getElementById("moneda_to").focus()
        return false
    }

    if (moneda_from != moneda_from_oculta) {
        alert("No puedes cambiar la moneda seleccionada si quieres hacer la compra")
        document.getElementById("moneda_from").focus()
        return false
    }

    if (!cantidad_resultante) {
        alert("No puedes comprar sin antes convertir las monedas seleccionadas")
        document.getElementById("cantidad_resultante").focus()
        return false
    }

    return true
}

function llamaApiPrecios(ev) {
    ev.preventDefault()
   

    
    const llamada = {}
    llamada.moneda_from = document.querySelector("#moneda_from").value
    llamada.cantidad_inicial = document.querySelector("#cantidad_inicial").value
    llamada.cantidad_inicial_oculta = document.querySelector("#cantidad_inicial").value
    llamada.moneda_to = document.querySelector("#moneda_to").value
    
    //console.log(Object.values(llamada));

    document.querySelector("#cantidad_inicial_oculta").value = document.querySelector("#cantidad_inicial").value

    //let cantidad_inicial_oculta = document.getElementById("cantidad_inicial").value;
    //document.getElementById("cantidad_inicial_oculta").value = cantidad_inicial_oculta

    if (!validarConversion()) {
        return 
    }


    xhr2 = new XMLHttpRequest()
    xhr2.onload = RecibeApiConversion
    
    
    xhr2.open("GET", `https://pro-api.coinmarketcap.com/v1/tools/price-conversion?amount=${llamada.cantidad_inicial}&symbol=${llamada.moneda_from}&convert=${llamada.moneda_to}&CMC_PRO_API_KEY=b7f76ab2-bc37-48e1-a6e4-132fbb70df02`, true)

   
    xhr2.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    xhr2.send()
        
    console.log("petición lanzada")
    

   

}


function RecibeApiConversion() {
    if (this.readyState === 4 && this.status === 200 || this.status === 201) {
        const conversion = JSON.parse(this.responseText)

        if (conversion.Response === 'False') {
            alert("Se ha producido un error en la llamada" + respuesta.mensaje)
            return
        }

       
        
        
        const llamada = {}

        llamada.moneda_to = document.querySelector("#moneda_to").value
        cantidad_resultante = conversion.data.quote[llamada.moneda_to].price
        document.getElementById('cantidad_resultante').value=cantidad_resultante
        if (llamada.moneda_to === "EUR") {
            document.getElementById('cantidad_resultante').value=cantidad_resultante.toFixed(2)
        }
        
  
        

        
        //const tbody = document.querySelector(".table tbody")

        

    }
}

function grabaCompra (ev) {
    ev.preventDefault()   

    const compra = capturaFormCompra() //En esta variable movimiento guardo el objeto que devuelve la funcion capturaFormMovimiento, que son los nuevos datos que he introducido en el formulario para crera un nuevo registro
    
    if (!validarCompra()) {
        return 
    }

    xhr.open("POST", `http://localhost:5000/api/v1/movimiento`, true)  //Ahora lanzo la peticion con el xhr.open, sin id 
    xhr.onload = listaMovimientos //Este onload, que es el punto de recuperacion de los datos, es para esta petición de PUT. Se va a la función recibeRespuesta, que es la que va a mostrar la modificación en la tabla de movimientos al ejecutarse 
        
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8") //Esto lo que está diciendo es: voy a mter en la  cabecera un json, para que en el archivo views del servidor sepa lo que esperar. En la cabecera viaja el tipo de informacion que va en el body, que en este caso es un json
        
    xhr.send(JSON.stringify(compra))   //El metodo stringify lo que hace en este caso es coger un objeto de javascript y convertirlo en un texto que viaja al servidor, es el contrario a json.pars

    console.log("Compra realizada y registrada en base de datos")

    //limpiaForm(form)
}

function sumaEurosInvertidos() {
    if (this.readyState === 4 && this.status === 200) {       
        const respuesta = JSON.parse(this.responseText) 
        console.log(respuesta)
        
        
        if (respuesta.status !== "success") {
            alert("Error en la consulta de movimientos registrados")
            return
        }
    
    const movimientos = respuesta.movimientos_crypto

    var sumaCantidadesFrom = {}
    for(let clave of movimientos) {
        
        if(!sumaCantidadesFrom[clave.moneda_from]) {
            sumaCantidadesFrom[clave.moneda_from] = 0
        }
        if (clave.moneda_from === "EUR") {
            sumaCantidadesFrom[clave.moneda_from] += clave.cantidad_inicial
        }
        if (clave.moneda_from != "EUR") {
            sumaCantidadesFrom[clave.moneda_from] += clave.cantidad_inicial
            
        }

        //} 
    
    
    }
    total_invertido=sumaCantidadesFrom.EUR
    document.getElementById('total_invertido').value=total_invertido
    console.log(sumaCantidadesFrom)

    var sumaCantidadesTo = {}
    for(let clave of movimientos) {
        
        if(!sumaCantidadesTo[clave.moneda_to]) {
            sumaCantidadesTo[clave.moneda_to] = 0
        }
        if (clave.moneda_to in criptomonedas) {
            sumaCantidadesTo[clave.moneda_to] += clave.cantidad_resultante
        }
            
        }
    console.log(sumaCantidadesTo)
    }
}

function actualizaStatus(){
    xhr3 = new XMLHttpRequest() 
    xhr3.onload = sumaEurosInvertidos
    xhr3.open('GET', `http://localhost:5000/api/v1/movimientos`, true) 
    xhr3.send()
}

function valorCryptoEuros(){
    if (this.readyState === 4 && this.status === 200) {  
        const respuesta = JSON.parse(this.responseText) 
        
        
        if (respuesta.status !== "success") {
            alert("Error en la actualizacion de status")
            return
        }
    
    const movimientos = respuesta.movimientos_crypto

  
}
}
  


window.onload = function() { 
    llamaApiMovimientos() 

    llamaApiSaldos()

    actualizaStatus()

    

    document.querySelector("#convertir")
        .addEventListener("click", llamaApiPrecios)
    

    document.querySelector("#comprar")
        .addEventListener("click", grabaCompra)

    //document.querySelector("#cancelar")
        //.addEventListener("click", llamaApiPrecios)

    document.querySelector("#actualizar")
        .addEventListener("click", actualizaStatus)

}