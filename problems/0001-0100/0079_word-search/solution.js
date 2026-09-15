/**
 * @param {string[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
    const rows = board.length;
    const cols = board[0].length;
    const last = word.length - 1;
    const walk = (row, col, index) => {
        // The cell must supply this letter; the last letter completes the word.
        if (board[row][col] !== word[index]) return false;
        if (index === last) return true;
        // The board doubles as the visited set: overwrite the cell with a
        // marker no letter can equal, so deeper levels cannot step on it.
        const letter = board[row][col];
        board[row][col] = "#";
        let found = false;
        for (const [deltaRow, deltaCol] of [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ]) {
            const nextRow = row + deltaRow;
            const nextCol = col + deltaCol;
            if (nextRow >= 0 && nextRow < rows && nextCol >= 0 && nextCol < cols && walk(nextRow, nextCol, index + 1)) {
                found = true;
                break;
            }
        }
        // Restore on the way out: sibling starts and later cases see the board intact.
        board[row][col] = letter;
        return found;
    };
    for (let row = 0; row < rows; ++row) {
        for (let col = 0; col < cols; ++col) {
            if (walk(row, col, 0)) return true;
        }
    }
    return false;
};
