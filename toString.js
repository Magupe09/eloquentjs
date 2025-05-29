function numeroAString(n, base = 10) {
    let resultado = "", signo = "";
    if (n < 0) {
      signo = "-";
      n = -n;
    }
    do {
      resultado = String(n % base) + resultado;
      n /= base;
    } while (n > 0);
    return signo + resultado;
  }
  //console.log(numeroAString(13, 10));
  // → 1.5e-3231.3e-3221.3e-3211.3e-3201.3e-3191.3e-3181.3…

class FalloUnidadMultiplicadora extends Error {}

function multiplicacionPrimitiva(a, b) {
  if (Math.random() < 0.2) {
    return a*b
  } else {
    throw new FalloUnidadMultiplicadora("Klunk");
  }
}

function multiplicacionConfiable(a, b) {
  // Tu código aqui.
  while(true){
    try {
      resultado=multiplicacionPrimitiva(a, b)
      return resultado
    } catch (e) {
      if (e instanceof FalloUnidadMultiplicadora){
        
        return respuesta= multiplicacionPrimitiva(a,b);
      }else{
        throw e;
      }
  }
}
}

//console.log(multiplicacionPrimitiva(8, 8));
console.log(multiplicacionConfiable(9, 8));
// → 64