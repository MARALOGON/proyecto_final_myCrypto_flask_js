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

let losSaldos = {}
//var sumavalorEurFrom = 0
//var sumavalorEurTo = 0

//var sumaCantidadesTo
//const movimientos = movimientos_crypto
var cantidadFromValidada = false
var cantdadToValidada = false
//console.log(movimientos)



function listaMovimientos() { 
    if (this.readyState === 4 && this.status === 200) {   
        const respuesta = JSON.parse(this.responseText) 
        
        

        if (respuesta.status !== "success") {
            alert("Error en la consulta de movimientos registrados")
            return
        }

     

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
            tbody.appendChild(fila) 
        
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
        var monedas_to = movimientos[i].moneda_to
        var monedas_from = movimientos[i].moneda_from
        saldos_to = movimientos[i].moneda_to[cantidad_resultante] - movimientos[i].cantidad_inicial
        
        var cantidades_to = {}

        for (const moneda of movimientos) {
            if (cantidades_to[moneda]) {
                cantidades_to[moneda] += cantidad_resultante
            } 
            //console.log(cantidades_to)
            
        }
        

        for (var x = 0; x < monedas_to.length; x++) {
            const listItem = document.createElement('li')
            listItem.textContent = monedas_to[x]
            myList.appendChild(listItem)
        }
        console.log(monedas_to)

        for (var y = 0; y < saldos_to.length; y++) {
            const listItem = document.createElement('li')
            listItem.textContent = saldos_to[y]
            myList.appendChild(listItem)
        }
        console.log(saldos_to)
        console.log(cantidades_to)
    }
        
    

    }

}



function llamaApiSaldos(){
    xhr4 = new XMLHttpRequest() 
    xhr4.onload = listaSaldos
    xhr4.open('GET', `http://localhost:5000/api/v1/movimientos`, true) 
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


function validarConversion() {
    var moneda_from = document.getElementById("moneda_from").value;
    var moneda_to = document.getElementById("moneda_to").value;
    var cantidad_inicial = document.getElementById("cantidad_inicial").value;
    
    if (moneda_from === moneda_to) {
        swal("Error", "No puedes seleccionar la misma moneda en ambos campos", "error")
        document.getElementById("moneda_to").focus();
        return false

    } else if (!cantidad_inicial) { 
        swal("Error", "Debes introducir un importe numérico para convertir", "error")
        document.getElementById("cantidad_inicial").focus();
        return false

   
    } else if (cantidad_inicial <= 0) {
        swal("Error", "Debes introducir un importe superior a 0 para convertir", "error")
        document.getElementById("cantidad_inicial").focus();
        return false

    } else if (cantidad_inicial > 1000000000000) {
        swal("Error", "Debes introducir un importe menor de 1000000000000 para convertir", "error")
        document.getElementById("cantidad_inicial").focus();
        return false
    }

    return true
   
}

/*function submitCheck() {
    
    var cantidad_inicial = document.getElementById("cantidad_inicial").value;
    var cantidad_resultante = document.getElementById("cantidad_resultante").value
    
    if (cantidad_inicial && cantidad_resultante) {
 
        comprar.disabled = false;              
        comprar.removeAttribute("disabled");  
      } 
  }*/

function validarCompra() {

    var cantidad_inicial = document.getElementById("cantidad_inicial").value;
    var cantidad_inicial_oculta = document.getElementById("cantidad_inicial_oculta").value;
    var cantidad_resultante = document.getElementById("cantidad_resultante").value;
    var moneda_to = document.getElementById("moneda_to").value;
    var moneda_to_oculta = document.getElementById("moneda_to_oculta").value;
    var moneda_from = document.getElementById("moneda_from").value;
    var moneda_from_oculta = document.getElementById("moneda_from_oculta").value;

    
    

    if (cantidad_inicial != cantidad_inicial_oculta) {
        swal("Error", "No puedes modificar el importe a convertir si quieres hacer la compra", "error")
        document.getElementById("cantidad_inicial").focus()
        return false
    }

    if (moneda_to != moneda_to_oculta) {
        swal("Error", "No puedes cambiar la moneda seleccionada si quieres hacer la compra", "error")
        document.getElementById("moneda_to").focus()
        return false
    }

    if (moneda_from != moneda_from_oculta) {
        swal("Error", "No puedes cambiar la moneda seleccionada si quieres hacer la compra", "error")
        document.getElementById("moneda_from").focus()
        return false
    }

    if (!cantidad_inicial) {
        swal("Error", "No puedes comprar sin introducir antes alguna cantidad inicial", "error")
        document.getElementById("cantidad_inicial").focus()
        return false
    }

    if (!cantidad_resultante) {
        swal("Error", "No puedes comprar sin convertir antes alguna cantidad inicial", "error")
        document.getElementById("cantidad_resultante").focus()
        return false
    }

    return true
}

function llamaApiPrecios(ev) {
    ev.preventDefault()
   

    const llamada = {}
    llamada.moneda_from = document.querySelector("#moneda_from").value
    llamada.moneda_from_oculta = document.querySelector("#moneda_from").value
    llamada.cantidad_inicial = document.querySelector("#cantidad_inicial").value
    llamada.cantidad_inicial_oculta = document.querySelector("#cantidad_inicial").value
    llamada.moneda_to = document.querySelector("#moneda_to").value
    llamada.moneda_to_oculta = document.querySelector("#moneda_to").value

    
    console.log(llamada)

    document.querySelector("#cantidad_inicial_oculta").value = document.querySelector("#cantidad_inicial").value
    document.querySelector("#moneda_from_oculta").value = document.querySelector("#moneda_from").value
    document.querySelector("#moneda_to_oculta").value = document.querySelector("#moneda_to").value


    if (!validarConversion()) {
        return 
    }


    xhr2 = new XMLHttpRequest()
    xhr2.onload = RecibeApiConversion
    
    
    xhr2.open("GET", `http://localhost:5000/api/v1/par/${llamada.moneda_from}/${llamada.moneda_to}/${llamada.cantidad_inicial}`, true)

   
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

    const compra = capturaFormCompra() 
    
    if (!validarCompra()) {
        return 
    }

    xhr.open("POST", `http://localhost:5000/api/v1/movimiento`, true)  
    xhr.onload = listaMovimientos 
        
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8") 
        
    xhr.send(JSON.stringify(compra))   

    swal("Bien!", "Compra realizada y registrada en base de datos con éxito", "success")
    
    console.log("Compra realizada y registrada en base de datos")

    document.forms["form"].reset()

   

}
    
    


var saldo_euros
var total_invertido_euros
function sumaEurosInvertidos() {
    if (this.readyState === 4 && this.status === 200) {       
        const respuesta = JSON.parse(this.responseText) 
        console.log(respuesta)
        
        
        if (respuesta.status !== "success") {
            alert("Error en la consulta de movimientos registrados")
            return
        }
    
    const movimientos = respuesta.movimientos_crypto

    var sumaEurosFrom = {}
    var sumaEurosTo = {}
    for(let clave of movimientos) {
        
        if(!sumaEurosFrom[clave.moneda_from]) {
            sumaEurosFrom[clave.moneda_from] = 0
        }
        if (clave.moneda_from === "EUR") {
            sumaEurosFrom[clave.moneda_from] += clave.cantidad_inicial
        }
          
        if(!sumaEurosTo[clave.moneda_to]) {
            sumaEurosTo[clave.moneda_to] = 0
        }
        if (clave.moneda_to === "EUR") {
            sumaEurosTo[clave.moneda_to] += clave.cantidad_resultante
        } 
    
    }
    total_invertido_euros=sumaEurosFrom.EUR
    total_obtenido_euros=sumaEurosTo.EUR
    saldo_euros=sumaEurosTo.EUR - sumaEurosFrom.EUR
    document.getElementById('total_invertido').value=total_invertido_euros
    sumaToFrom()

    


    var sumaCantidadesTo = []
    movimientos.forEach(function (a) {

        if (!this[a.moneda_to]) {
            this[a.moneda_to] = { moneda: a.moneda_to, cantidad_resultante: 0 };
            sumaCantidadesTo.push(this[a.moneda_to]);
    }
        
        if (a.moneda_to != "EUR") {
        this[a.moneda_to].cantidad_resultante += a.cantidad_resultante 
        }   
    }, [])


    for(let i=0; i<sumaCantidadesTo.length; i++){
        if(sumaCantidadesTo[i].moneda != "EUR"){
        xhr5 = new XMLHttpRequest()
        xhr5.onload = valorCantidadesToEnEuros
    
    
        xhr5.open("GET", `http://localhost:5000/api/v1/par/${sumaCantidadesTo[i].moneda}/EUR/${sumaCantidadesTo[i].cantidad_resultante}`, true)


        xhr5.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
        xhr5.send()
        }
    }
    //console.log(sumaCantidadesTo)

    var sumaCantidadesFrom = []
    movimientos.forEach(function (a) {

        if (!this[a.moneda_from]) {
            this[a.moneda_from] = { moneda: a.moneda_from, cantidad_inicial: 0 };
            sumaCantidadesFrom.push(this[a.moneda_from]);
    }

        if (a.moneda_from != "EUR") {
        this[a.moneda_from].cantidad_inicial += a.cantidad_inicial
        }

    }, [])

    for(let i=0; i<sumaCantidadesFrom.length; i++){
        if(sumaCantidadesFrom[i].moneda != "EUR"){
        xhr5 = new XMLHttpRequest()
        xhr5.onload = valorCantidadesFromEnEuros
    
    
        xhr5.open("GET", `http://localhost:5000/api/v1/par/${sumaCantidadesFrom[i].moneda}/EUR/${sumaCantidadesFrom[i].cantidad_inicial}`, true)


        xhr5.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
        xhr5.send()
        }
    }
    //console.log(sumaCantidadesFrom)

    /*const saldosCrypto =[]
    sumaCantidadesTo.filter((t) => {
        sumaCantidadesFrom.filter((f) => {
            if(t.moneda_to === f.moneda_from){
                (t.cantidad_resultante - f.cantidad_inicial)
                saldosCrypto.push(t)
            }


        })


    })*/
    
    //console.log(saldosCrypto)
    }
   

    

    
    
    
}

        

    
    
        

    

    
/*function saldosCrypto(){
// 1. Con este bloque consigo agrupar los saldos de moneda_to en forma de objeto, siendo la clave la moneda y el valor la suma de las cantidades_to correspondientes a esa moneda. Ejemplo {ETH:0.2, BTC:0.01}
    // pero no he conseguido hacer la llamada a API CMC con ello

    var sumaCantidadesTo = []
    for(let clave of movimientos) {

        if(!sumaCantidadesTo[clave.moneda_to]) {
            sumaCantidadesTo[clave.moneda_to] = 0
        }
        if (clave.moneda_to in criptomonedas) {
            sumaCantidadesTo[clave.moneda_to] += clave.cantidad_resultante
        }

        }
    console.log(sumaCantidadesTo)


}*/  

    
    
    

var valorEurTo = []
var sumavalorEurTo
function valorCantidadesToEnEuros(){
    
    if (this.readyState === 4 && this.status === 200 || this.status === 201) {
        const conversion = JSON.parse(this.responseText)
        //console.log(conversion)
        
        

        if (conversion.Response === 'False') {
            alert("Se ha producido un error en la llamada" + respuesta.mensaje)
            return
        }

        
    
            cantidad_to_euros = conversion.data.quote["EUR"].price
            valorEurTo.push(cantidad_to_euros)
           
    } 
        //console.log(valorEurTo)


    
    sumavalorEurTo = 0
    valorEurTo.forEach (function(valor){
    sumavalorEurTo+=valor
    })
    console.log(sumavalorEurTo)
    sumaToFrom()



}    

var valorEurFrom = [] 
var sumavalorEurFrom
function valorCantidadesFromEnEuros(){
    if (this.readyState === 4 && this.status === 200 || this.status === 201) {
        const conversion = JSON.parse(this.responseText)
        //console.log(conversion)
             
        
        if (conversion.Response === 'False') {
            alert("Se ha producido un error en la llamada" + respuesta.mensaje)
            return
        }
        cantidad_from_euros = conversion.data.quote["EUR"].price
        valorEurFrom.push(cantidad_from_euros) 
    }    
           
    sumavalorEurFrom = 0 
    valorEurFrom.forEach (function(valor){
    sumavalorEurFrom+=valor
    })
    console.log(sumavalorEurFrom)
    sumaToFrom()

} 


function actualizaStatus(){
    xhr3 = new XMLHttpRequest() 
    xhr3.onload = sumaEurosInvertidos
    xhr3.open('GET', `http://localhost:5000/api/v1/movimientos`, true) 
    xhr3.send()


}

function sumaToFrom(){
    var localCryptoFrom = sumavalorEurFrom
    var localCryptoTo = sumavalorEurTo
    var localSaldoEur = saldo_euros
    var localEurosInvertidos = total_invertido_euros
    valorCryptos = localCryptoTo - localCryptoFrom
    valorActual = localEurosInvertidos + localSaldoEur + valorCryptos
    document.getElementById('valor_actual').value=valorActual.toFixed(2)


    beneficioObtenido = valorActual - localEurosInvertidos
    document.getElementById('beneficio_obtenido').value=beneficioObtenido.toFixed(2)

}

window.onload = function() { 
    llamaApiMovimientos() 

    llamaApiSaldos()

    actualizaStatus()

    //valorCantidadesFromEnEuros()

    //valorCantidadesToEnEuros()

    document.querySelector("#convertir")
        .addEventListener("click", llamaApiPrecios)
    

    document.querySelector("#comprar")
        .addEventListener("click", grabaCompra)


    document.querySelector("#actualizar")
        .addEventListener("click", actualizaStatus)

}