const caja = {
    bloqueada: true,
    desbloquear() { this.bloqueada = false; },
    bloquear() { this.bloqueada = true; },
    _contenido: [],
    get contenido() {
        if (this.bloqueada) throw new Error("Bloqueada!");
        return this._contenido;
    }
};



function conCajaDesbloqueada(cuerpo) {
    let estado = caja.bloqueada;
    if (estado) caja.desbloquear()
    try {
       cuerpo();
    } catch (e) {
        console.log("Error encontrado:", e);
        throw e;
    }finally{
        if(estado) caja.bloquear()
    }
}

conCajaDesbloqueada(function () {
    caja.contenido.push("moneda de oro");
});

try {
    conCajaDesbloqueada(function () {
        throw new Error("Piratas en el horizonte! Abortar!");
    });
} catch (e) {
    console.log("Error encontrado:", e);
}
console.log(caja.bloqueada);
// → true

let almacen = "1 limon, 2 lechugas, y 101 huevos";
function menosUno(coincidencia, cantidad, unidad) {
  cantidad = Number(cantidad) - 1;
  if (cantidad == 1) { // solo queda uno, remover la 's'
    unidad = unidad.slice(0, unidad.length - 1);
  } else if (cantidad == 0) {
    cantidad = "sin";
  }
  return cantidad + " " + unidad;
}
console.log(almacen.replace(/(\d+) (\w+)/g, menosUno));
// → sin limon, 1 lechuga, y 100 huevos