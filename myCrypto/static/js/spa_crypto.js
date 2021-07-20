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

//let losMovimientos  



function listaMovimientos() { 
    if (this.readyState === 4 && this.status === 200) {   
        const respuesta = JSON.parse(this.responseText) 
        
        if (respuesta.status !== "success") {
            alert("Error en la consulta de movimientos registrados")
            return
        }

        //losMovimientos = respuesta.movimientos 
        
        
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

xhr = new XMLHttpRequest() 
xhr.onload = listaMovimientos 



function llamaApiMovimientos() { 
    xhr.open('GET', `http://localhost:5000/api/v1/movimientos`, true) 
    xhr.send()
}

function capturaFormMovimiento() { 
    const movimiento = {}
    movimiento.moneda_from = document.querySelector("#moneda_from").value 
    movimiento.cantidad_inicial = document.querySelector("#cantidad_inicial").value
    movimiento.moneda_to = document.querySelector("#moneda_to").value
    movimiento.cantidad_resultante = document.querySelector("#cantidad_resultante").value
   
    return movimiento 

}

function llamaApiPrecios(ev) {
    document.querySelector("#convertir")
    .addEventListener("click", (ev) => {
    ev.preventDefault()

    const llamada = {}
    llamada.moneda_from = document.querySelector("#moneda_from").value
    llamada.cantidad_inicial = document.querySelector("#cantidad_inicial").value
    llamada.moneda_to = document.querySelector("#moneda_to").value

    xhr2 = new XMLHttpRequest()
    
    xhr2.open("GET", `https://pro-api.coinmarketcap.com/v1/tools/price-conversion?amount=${llamada.cantidad_inicial}&symbol=${llamada.moneda_from}}&convert=${llamada.moneda_to}&CMC_PRO_API_KEY=b7f76ab2-bc37-48e1-a6e4-132fbb70df02`, true)
    xhr2.onload = llamaApiMuestraConversion
    xhr2.send()
    
    return llamada 

    })
}

/*function llamaApiMuestraConversion() {
    if (this.readyState === 4 && (this.status === 200 || this.status === 201)) {
        const conversion = JSON.parse(this.responseText)

        if (conversion.status !== "success") {
            alert("Se ha producido un error en la llamada" + respuesta.mensaje)
            return
        }

        laConversion = conversion.movimientos_crypto
        const tbody = document.querySelector(".table tbody")
        return conversion.data.quote[moneda_to].price


}
*/
window.onload = function() { 
    llamaApiMovimientos() 

    //llamaApiPrecios()



}