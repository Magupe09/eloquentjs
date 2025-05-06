const caminos = [
    "Casa de Alicia-Casa de Bob",        "Casa de Alicia-Cabaña",
    "Casa de Alicia-Oficina de Correos", "Casa de Bob-Ayuntamiento",
    "Casa de Daria-Casa de Ernie",       "Casa de Daria-Ayuntamiento",
    "Casa de Ernie-Casa de Grete",       "Casa de Grete-Granja",
    "Casa de Grete-Tienda",              "Mercado-Granja",
    "Mercado-Oficina de Correos",        "Mercado-Tienda",
    "Mercado-Ayuntamiento",              "Tienda-Ayuntamiento"
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