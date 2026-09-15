/**
 * @param {string[][]} board
 * @param {number} rMove
 * @param {number} cMove
 * @param {string} color
 * @return {boolean}
 */
var checkMove = function (board, rMove, cMove, color) {
    // Walk the eight directions from the move cell: a legal move needs a run
    // of the opposite color ending in a cell of the move's color.
    const opposite = color === "B" ? "W" : "B";
    const dr = [-1, -1, -1, 0, 0, 1, 1, 1];
    const dc = [-1, 0, 1, -1, 1, -1, 0, 1];
    for (let d = 0; d < 8; ++d) {
        let r = rMove + dr[d];
        let c = cMove + dc[d];
        if (r < 0 || r >= 8 || c < 0 || c >= 8 || board[r][c] !== opposite) continue;
        r += dr[d];
        c += dc[d];
        while (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] === opposite) {
            r += dr[d];
            c += dc[d];
        }
        if (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] === color) return true;
    }
    return false;
};
