let cadena = "Algunas practicas de gran consistían en llamar una cantidad masiva de personas para conseguir una cita, investigar que no hacia las demás empresas y aprovechar esa brecha, impulsando nuestra estrategia enfocada en sus debilidades, algo como una ventaja justa, según el texto, una que tu misma  creas en análisis ."

let expReg = new RegExp("en","ig")// la g indica que tome todas las coincidencias 
let expReg2=/lorem/g;
console.log(expReg.test(cadena))//Devuelve un boolean
console.log(expReg.exec(cadena))//Devuelve un array con la hubicacion de la coincidencia