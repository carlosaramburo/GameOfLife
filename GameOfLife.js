class GameOfLife {
  constructor() {
    this.cell_size = 20;
    this.columns = Math.floor(1200 / this.cell_size);
    this.rows = Math.floor(500 / this.cell_size);
    this.active_array = [];
    this.inactive_array = [];
  }

  prepare = () => {
    this.initializeArray();
    this.createTable();
  };

  initializeArray = () => {
    for (let i = 0; i < this.rows; i++) {
      this.active_array[i] = [];
      this.inactive_array[i] = [];
      for (let j = 0; j < this.columns; j++) {
        this.active_array[i][j] = 0;
        this.inactive_array[i][j] = 0;
      }
    }
    //this.inactive_array = this.active_array;
  };

  resetArrays = () => {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.active_array[i][j] = 0;
        this.inactive_array[i][j] = 0;
      }
    }
    this.updateCellColor();
  };

  createTable = () => {
    let container = document.getElementById("board");
    container.innerHTML = "";
    let table = document.createElement("table");
    for (let i = 0; i < this.rows; i++) {
      let tr = document.createElement("tr");
      for (let j = 0; j < this.columns; j++) {
        let cell = document.createElement("td");
        cell.setAttribute("id", i + "_" + j);
        cell.setAttribute("class", "dead");
        tr.appendChild(cell);
      }
      table.appendChild(tr);
    }
    container.appendChild(table);
    document.querySelector("table").addEventListener("click", (e) => {
      let selectedCell = e.target.closest("td");
      this.editCell(selectedCell);
    });
  };

  editCell = (cell) => {
    let row_col = cell.id.split("_");
    let row = row_col[0];
    let column = row_col[1];
    let classes = cell.getAttribute("class");
    if (classes.indexOf("alive") > -1) {
      cell.setAttribute("class", "dead");
      this.active_array[row][column] = 0;
    } else {
      cell.setAttribute("class", "alive");
      this.active_array[row][column] = 1;
    }
  };

  start = () => {
    this.updateState();
    this.updateCellColor();
  };

  updateCellColor = () => {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        let cell = document.getElementById(i + "_" + j);
        if (this.active_array[i][j] == 0) {
          cell.setAttribute("class", "dead");
        } else {
          cell.setAttribute("class", "alive");
        }
      }
    }
  };

  getCellValue = (row, col) => {
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

  countNeighbors = (row, col) => {
    let totalNeigh = 0;
    totalNeigh += this.getCellValue(row - 1, col - 1);
    totalNeigh += this.getCellValue(row - 1, col);
    totalNeigh += this.getCellValue(row - 1, col + 1);
    totalNeigh += this.getCellValue(row, col - 1);
    totalNeigh += this.getCellValue(row, col + 1);
    totalNeigh += this.getCellValue(row + 1, col - 1);
    totalNeigh += this.getCellValue(row + 1, col);
    totalNeigh += this.getCellValue(row + 1, col + 1);
    return totalNeigh;
  };

  updateCellValue = (row, col) => {
    let totalNeigh = this.countNeighbors(row, col);
    if (this.active_array[row][col] == 1) {
      if (totalNeigh < 2 || totalNeigh > 3) {
        return 0;
      }
      return 1;
    } else {
      if (totalNeigh == 3) {
        return 1;
      }
      return 0;
    }
  };

  updateState = () => {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        let new_state = this.updateCellValue(i, j);
        this.inactive_array[i][j] = new_state;
      }
    }
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.active_array[i][j] = this.inactive_array[i][j];
      }
    }
    this.resetGrid();
  };

  resetGrid = () => {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.inactive_array[i][j] = 0;
      }
    }
  };

  random = () => {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        let isAlive = Math.random();
        if (isAlive > 0.7) {
          let cell = document.getElementById(i + "_" + j);
          cell.setAttribute("class", "alive");
          this.active_array[i][j] = 1;
        }
      }
    }
  };
}
