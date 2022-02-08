class JuegoDeLaVida {
  constructor() {
    this.tamaño_celda = 20;
    this.columnas = Math.floor(1200 / this.tamaño_celda);
    this.filas = Math.floor(500 / this.tamaño_celda);
    this.active_array = [];
    this.inactive_array = [];
  }

  preparar = () => {
    this.inicializarArray();
    this.crearTabla();
  };

  inicializarArray = () => {
    for (let i = 0; i < this.filas; i++) {
      this.active_array[i] = [];
      this.inactive_array[i] = [];
      for (let j = 0; j < this.columnas; j++) {
        this.active_array[i][j] = 0;
        this.inactive_array[i][j] = 0;
      }
    }
    //this.inactive_array = this.active_array;
  };

  limpiarArrays = () => {
    for (let i = 0; i < this.filas; i++) {
      for (let j = 0; j < this.columnas; j++) {
        this.active_array[i][j] = 0;
        this.inactive_array[i][j] = 0;
      }
    }
    this.actualizarColorCelda();
  };

  crearTabla = () => {
    let contenedor = document.getElementById("tablero");
    contenedor.innerHTML = "";
    let tabla = document.createElement("table");
    for (let i = 0; i < this.filas; i++) {
      let tr = document.createElement("tr");
      for (let j = 0; j < this.columnas; j++) {
        let celda = document.createElement("td");
        celda.setAttribute("id", i + "_" + j);
        celda.setAttribute("class", "muerta");
        tr.appendChild(celda);
      }
      tabla.appendChild(tr);
    }
    contenedor.appendChild(tabla);
    document.querySelector("table").addEventListener("click", (e) => {
      let celdaSeleccionada = e.target.closest("td");
      this.editarCelda(celdaSeleccionada);
    });
  };

  editarCelda = (celda) => {
    let fil_col = celda.id.split("_");
    let fila = fil_col[0];
    let columna = fil_col[1];
    let classes = celda.getAttribute("class");
    if (classes.indexOf("viva") > -1) {
      celda.setAttribute("class", "muerta");
      this.active_array[fila][columna] = 0;
    } else {
      celda.setAttribute("class", "viva");
      this.active_array[fila][columna] = 1;
    }
  };

  iniciar = () => {
    this.actualizarEstado();
    this.actualizarColorCelda();
  };

  actualizarColorCelda = () => {
    for (let i = 0; i < this.filas; i++) {
      for (let j = 0; j < this.columnas; j++) {
        let celda = document.getElementById(i + "_" + j);
        if (this.active_array[i][j] == 0) {
          celda.setAttribute("class", "muerta");
        } else {
          celda.setAttribute("class", "viva");
        }
      }
    }
  };

  obtenerValorCelda = (row, col) => {
    try {
      if (typeof this.active_array[row][col] !== "undefined") {
        return this.active_array[row][col];
      } else {
        return 0;
      }
    } catch {
      return 0;
    }
  };

  contarVecinos = (row, col) => {
    let vecinos_totales = 0;
    vecinos_totales += this.obtenerValorCelda(row - 1, col - 1);
    vecinos_totales += this.obtenerValorCelda(row - 1, col);
    vecinos_totales += this.obtenerValorCelda(row - 1, col + 1);
    vecinos_totales += this.obtenerValorCelda(row, col - 1);
    vecinos_totales += this.obtenerValorCelda(row, col + 1);
    vecinos_totales += this.obtenerValorCelda(row + 1, col - 1);
    vecinos_totales += this.obtenerValorCelda(row + 1, col);
    vecinos_totales += this.obtenerValorCelda(row + 1, col + 1);
    return vecinos_totales;
  };

  actualizarValorCelda = (row, col) => {
    let totalVecinos = this.contarVecinos(row, col);
    if (this.active_array[row][col] == 1) {
      if (totalVecinos < 2 || totalVecinos > 3) {
        return 0;
      }
      return 1;
    } else {
      if (totalVecinos == 3) {
        return 1;
      }
      return 0;
    }
  };

  actualizarEstado = () => {
    for (let i = 0; i < this.filas; i++) {
      for (let j = 0; j < this.columnas; j++) {
        let nuevo_estado = this.actualizarValorCelda(i, j);
        this.inactive_array[i][j] = nuevo_estado;
      }
    }
    for (let i = 0; i < this.filas; i++) {
      for (let j = 0; j < this.columnas; j++) {
        this.active_array[i][j] = this.inactive_array[i][j];
      }
    }
    this.resetGrid();
  };

  resetGrid = () => {
    for (let i = 0; i < this.filas; i++) {
      for (let j = 0; j < this.columnas; j++) {
        this.inactive_array[i][j] = 0;
      }
    }
  };

  aleatorio = () => {
    for (let i = 0; i < this.filas; i++) {
      for (let j = 0; j < this.columnas; j++) {
        let estaViva = Math.random();
        if (estaViva > 0.7) {
          let celda = document.getElementById(i + "_" + j);
          celda.setAttribute("class", "viva");
          this.active_array[i][j] = 1;
        }
      }
    }
  };
}
