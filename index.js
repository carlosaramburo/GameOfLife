const game = new GameOfLife();

window.onload = () => {

    let generation = 1;
    let state;
    let pause = false;
    const time = 300;

    game.prepare();

    document.getElementById("start").addEventListener("click", () => {
        if(pause == false) {
            generation = 1;
        }
        clearTimeout(state);
        state = window.setInterval(() => {
            generation += 1;
            document.getElementById("generation").innerHTML = "Generation: " + generation;
            game.start();
        }, time);
    })

    document.getElementById("clear").addEventListener("click", () => {
        pause = true;
        clearInterval(state);
        document.getElementById("generation").innerHTML = "Generation: 1";
        game.resetArrays();
        generation = 1;
    })

    document.getElementById("pause").addEventListener("click", () => {
        pause = true;
        game.resetGrid();
        clearInterval(state);
    });

    document.getElementById("random").addEventListener("click", () => {
        pause = false;
        clearInterval(state);
        document.getElementById("generation").innerHTML = "Generation: 1";
        game.resetArrays();
        game.random();
    });
}