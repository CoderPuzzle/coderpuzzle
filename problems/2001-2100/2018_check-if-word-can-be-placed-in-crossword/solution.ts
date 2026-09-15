function placeWordInCrossword(board: string[][], word: string): boolean {
    const rows = board.length;
    const columns = board[0].length;
    const matches = (row: number, column: number, rowStep: number, columnStep: number, length: number): boolean => {
        if (length !== word.length) return false;
        let forward = true;
        let backward = true;
        for (let offset = 0; offset < length; ++offset) {
            const cell = board[row + rowStep * offset][column + columnStep * offset];
            if (cell !== " ") {
                forward = forward && cell === word[offset];
                backward = backward && cell === word[length - 1 - offset];
            }
        }
        return forward || backward;
    };

    for (let row = 0; row < rows; ++row) {
        let start = 0;
        for (let end = 0; end <= columns; ++end) {
            if (end === columns || board[row][end] === "#") {
                if (matches(row, start, 0, 1, end - start)) return true;
                start = end + 1;
            }
        }
    }

    for (let column = 0; column < columns; ++column) {
        let start = 0;
        for (let end = 0; end <= rows; ++end) {
            if (end === rows || board[end][column] === "#") {
                if (matches(start, column, 1, 0, end - start)) return true;
                start = end + 1;
            }
        }
    }

    return false;
}
