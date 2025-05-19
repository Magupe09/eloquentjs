const caminos = [
  "Casa de Alicia-Casa de Bob", "Casa de Alicia-Cabaña",
  "Casa de Alicia-Oficina de Correos", "Casa de Bob-Ayuntamiento",
  "Casa de Daria-Casa de Ernie", "Casa de Daria-Ayuntamiento",
  "Casa de Ernie-Casa de Grete", "Casa de Grete-Granja",
  "Casa de Grete-Tienda", "Mercado-Granja",
  "Mercado-Oficina de Correos", "Mercado-Tienda",
  "Mercado-Ayuntamiento", "Tienda-Ayuntamiento"
];
function construirGrafo(bordes) {
  let grafo = Object.create(null);
  console.log(grafo)
  function añadirBorde(desde, hasta) {
    if (grafo[desde] == null) {
      grafo[desde] = [hasta];
    } else {
      grafo[desde].push(hasta);
    }
  }
  for (let [desde, hasta] of bordes.map(c => c.split("-"))) {
    añadirBorde(desde, hasta);
    añadirBorde(hasta, desde);
  }
  console.log(grafo)
  return grafo;
}

const grafoCamino = construirGrafo(caminos);

class EstadoPueblo {
  constructor(lugar, paquetes) {
    this.lugar = lugar;
    this.paquetes = paquetes;
  }

  mover(destino) {
    if (!grafoCamino[this.lugar].includes(destino)) {
      return this;
    } else {
      let paquetes = this.paquetes.map(p => {
        if (p.lugar != this.lugar) return p;
        return { lugar: destino, direccion: p.direccion };
      }).filter(p => p.lugar != p.direccion);
      return new EstadoPueblo(destino, paquetes);
    }
  }
}

let primero = new EstadoPueblo(
  "Oficina de Correos",
  [{ lugar: "Oficina de Correos", direccion: "Casa de Alicia" }]
);
let siguiente = primero.mover("Casa de Alicia");

console.log(siguiente.lugar);
// → Casa de Alicia
console.log(siguiente.parcels);
// → []
console.log(primero.lugar);
// → Oficina de Correos.

function correrRobot(estado, robot, memoria) {
  for (let turno = 0; ; turno++) {
    if (estado.paquetes.length == 0) {
      console.log(`Listo en ${turno} turnos`);
      break;
    }
    let accion = robot(estado, memoria);
    estado = estado.mover(accion.direccion);
    memoria = accion.memoria;
    console.log(`Moverse a ${accion.direccion}`);
  }
}
function eleccionAleatoria(array) {
  let eleccion = Math.floor(Math.random() * array.length);
  return array[eleccion];
}


function robotAleatorio(estado) {
  return { direccion: eleccionAleatoria(grafoCamino[estado.lugar]) };
}

EstadoPueblo.aleatorio = function (numeroDePaquetes = 5) {
  let paquetes = [];
  for (let i = 0; i < numeroDePaquetes; i++) {
    let direccion = eleccionAleatoria(Object.keys(grafoCamino));
    let lugar;
    do {
      lugar = eleccionAleatoria(Object.keys(grafoCamino));
    } while (lugar == direccion);
    paquetes.push({ lugar, direccion });
  }
  return new EstadoPueblo("Oficina de Correos", paquetes);
};


correrRobot(EstadoPueblo.aleatorio(), robotAleatorio);

const rutaCorreo = [
  "Casa de Alicia", "Cabaña", "Casa de Alicia", "Casa de Bob",
  "Ayuntamiento", "Casa de Daria", "Casa de Ernie",
  "GCasa de Grete", "Tienda", "Casa de Grete", "Granja",
  "Mercado", "Oficina de Correos"
];

function robotRuta(estado, memoria) {
  if (memoria.length == 0) {
    memoria = rutaCorreo;
  }
  return { direction: memoria[0], memoria: memoria.slice(1) };
}

//runRobotAnimation(EstadoPueblo.aleatorio(), robotRuta, []);


function encontrarRuta(grafo, desde, hasta) {
  let trabajo = [{ donde: desde, ruta: [] }];
  for (let i = 0; i < trabajo.length; i++) {
    let { donde, ruta } = trabajo[i];
    for (let lugar of grafo[donde]) {
      if (lugar == hasta) return ruta.concat(lugar);
      if (!trabajo.some(w => w.donde == lugar)) {
        trabajo.push({ donde: lugar, ruta: ruta.concat(lugar) });
      }
    }
  }
}
function robotOrientadoAMetas({ lugar, paquetes }, ruta) {
  if (ruta.length == 0) {
    let paquete = paquetes[0];
    if (paquete.lugar != lugar) {
      ruta = encontrarRuta(grafoCamino, lugar, paquete.lugar);
    } else {
      ruta = encontrarRuta(grafoCamino, lugar, paquete.direccion);
    }
  }
  return { direccion: ruta[0], memoria: ruta.slice(1) };
}
//console.log( runRobotAnimation(EstadoPueblo.aleatorio(), robotOrientadoAMetas, []))



function correrRobotParaMedir(estado, robot, memoria) {
  for (let turno = 0; turno < 2000 ; turno++) {
    if (estado.paquetes.length == 0) {
      console.log(`Listo en ${turno} turnos`);
      return turno
      
    }
    let accion = robot(estado, memoria);
    estado = estado.mover(accion.direccion);
    memoria = accion.memoria;
    console.log(`Moverse a ${accion.direccion}`);
  }
  console.log("El robot no pudo completar la tarea en el límite de turnos.");
  return Infinity;
}
function  calcularPromedio(resultados){
       let promedio=0
       resultados.forEach(element => {
        promedio += element ;
       });
       promedio = promedio / resultados.length
       return promedio
}


function compararRobots(robot1, memoria1, robot2, memoria2) {
  const numeroDeTareas = 100;
  const resultadosRobot1 = [];
  const resultadosRobot2 = [];

  for (let i = 0; i < numeroDeTareas; i++) {
    // 1. Generar una tarea (un estado inicial del pueblo)
    const tarea = EstadoPueblo.aleatorio();

    // 2. Hacer que el robot 1 resuelva la tarea y registrar los pasos
    const pasosRobot1 = correrRobotParaMedir(tarea, robot1, memoria1); // Necesitas crear esta función

    // 3. Hacer que el robot 2 resuelva LA MISMA tarea y registrar los pasos
    const pasosRobot2 = correrRobotParaMedir(tarea, robot2, memoria2); // Usando la misma 'tarea'

    // 4. Guardar los resultados
    resultadosRobot1.push(pasosRobot1);
    resultadosRobot2.push(pasosRobot2);
  }

  // 5. Calcular los promedios
  const promedioRobot1 = calcularPromedio(resultadosRobot1); // Necesitas crear esta función
  const promedioRobot2 = calcularPromedio(resultadosRobot2); // Necesitas crear esta función

  // 6. Mostrar los resultados
  console.log(`Promedio Robot 1: ${promedioRobot1} pasos por tarea`);
  console.log(`Promedio Robot 2: ${promedioRobot2} pasos por tarea`);
}
compararRobots(robotRuta, [], robotOrientadoAMetas, []);
// Funciones auxiliares que necesitarás crear:
// - correrRobotParaMedir(estado, robot, memoria): Similar a correrRobot, pero devuelve el número de turnos.
// - calcularPromedio(arrayDeNumeros): Calcula la media de un array de números.