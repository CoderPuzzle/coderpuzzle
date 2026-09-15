/**
 * @param {string[]} board
 * @return {boolean}
 */
var validTicTacToe = function (board) {
    // Reachability folds into three facts about the final position. X
    // moves first and play strictly alternates, so the counts must
    // satisfy x == o or x == o + 1. The game stops at the first
    // completed line, so at most one player holds a winning row,
    // column, or diagonal — and the winner's decisive placement pins
    // the tally exactly: X's winning move leaves x == o + 1, O's
    // leaves x == o. A board passing all three gates was played; any
    // other board is unreachable.
    const cells = board.join("");
    let x = 0;
    let o = 0;
    for (const ch of cells) {
        if (ch === "X") {
            x += 1;
        } else if (ch === "O") {
            o += 1;
        }
    }
    if (x !== o && x !== o + 1) {
        return false;
    }
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    const wins = (player) =>
        lines.some(([a, b, c]) => cells[a] === player && cells[b] === player && cells[c] === player);
    const xwin = wins("X");
    const owin = wins("O");
    if (xwin && owin) {
        return false;
    }
    if (xwin && x !== o + 1) {
        return false;
    }
    if (owin && x !== o) {
        return false;
    }
    return true;
};
