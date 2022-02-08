const juego = new JuegoDeLaVida();

window.onload = () => {

    let generacion = 1;
    let estado;
    let pausa = false;
    const tiempo = 300;

    juego.preparar();

    document.getElementById("iniciar").addEventListener("click", () => {
        if(pausa == false) {
            generacion = 1;
        }
        clearTimeout(estado);
        estado = window.setInterval(() => {
            generacion += 1;
            document.getElementById("generacion").innerHTML = "Generación: " + generacion;
            juego.iniciar();
        }, tiempo);
    })

    document.getElementById("limpiar").addEventListener("click", () => {
        pausa = true;
        clearInterval(estado);
        document.getElementById("generacion").innerHTML = "Generación: 1";
        juego.limpiarArrays();
        generacion = 1;
    })

    document.getElementById("pausa").addEventListener("click", () => {
        pausa = true;
        juego.resetGrid();
        clearInterval(estado);
    });

    document.getElementById("random").addEventListener("click", () => {
        pausa = false;
        clearInterval(estado);
        juego.limpiarArrays();
        juego.aleatorio();
    });
}