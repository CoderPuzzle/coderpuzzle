var winnerOfGame = function (colors) {
    let aliceMoves = 0;
    let bobMoves = 0;

    for (let i = 1; i + 1 < colors.length; i++) {
        if (colors[i - 1] === colors[i] && colors[i] === colors[i + 1]) {
            if (colors[i] === "A") {
                aliceMoves++;
            } else {
                bobMoves++;
            }
        }
    }

    return aliceMoves > bobMoves;
};
