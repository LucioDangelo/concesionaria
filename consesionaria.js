let autos = require("./autos");
let persona = {
    nombre: 'Juan',
    capacidadDePagoEnCuotas: 20000,
    capacidadDePagoTotal: 100000
    };



let concesionaria = {
    autos: autos,


    buscarAuto:  function(patente){
        let autosEncontrados = autos.filter(function(auto){
            return auto.patente == patente; 
        });
        if (autosEncontrados.length > 0) {
            return autosEncontrados[0];
        }else{
            return null;
        }
    },
    venderAuto: function(patente) {
        let autoVendido = this.buscarAuto(patente);
        autos.forEach(function(auto) {
            if (auto.patente == patente) {
                auto.vendido = true;
            }
        })
     },
    autosParaLaVenta: function() {
        let autosSinVender = autos.filter(function(auto) {
           return auto.vendido == false;
        })
        return autosSinVender;
     },
    autosNuevos: function(){
        let autos0Km = this.autosParaLaVenta();
        return autos0Km.filter(function (auto){
           return auto.km < 100
        })
   },
   listaDeVentas: () => {
        let autosVendidos = autos.filter((auto) => {
            return auto.vendido == true;
        })
        let listaDeVentas = autosVendidos.map((auto) => {
            return auto.precio;
        })
        return listaDeVentas;
    },
    totalDeVentas: function() {
        return this.listaDeVentas().reduce((prev, curr) => {
            return prev + curr;
        }, 0)
    },
    puedeComprar: (auto, persona) => {
        let cuota = auto.precio / auto.cuotas;
        return persona.capacidadDePagoTotal > auto.precio && persona.capacidadDePagoEnCuotas > cuota
     },
    autosQuePuedeComprar(persona){
        return this.autosParaLaVenta().filter(auto => this.puedeComprar(auto,persona))
    },

};
