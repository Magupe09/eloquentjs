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