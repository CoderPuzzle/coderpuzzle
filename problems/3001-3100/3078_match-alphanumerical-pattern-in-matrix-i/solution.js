/**
 * @param {number[][]} board
 * @param {string[]} pattern
 * @return {number[]}
 */
var findPattern = function (board, pattern) {
    // Corners are scanned row-major, so the first hit already carries
    // the lowest row and then the lowest column. Each candidate is
    // validated by one pass that grows a letter->digit bijection:
    // a letter must repeat its own digit, and a digit already claimed
    // by one letter is refused for every other letter.
    const matches = (r, c) => {
        const toDigit = new Map();
        const toLetter = new Map();
        for (let i = 0; i < pattern.length; i++) {
            for (let j = 0; j < pattern[i].length; j++) {
                const value = board[r + i][c + j];
                const ch = pattern[i][j];
                if (ch >= "0" && ch <= "9") {
                    if (value !== ch.charCodeAt(0) - 48) {
                        return false;
                    }
                } else if (toDigit.has(ch)) {
                    if (toDigit.get(ch) !== value) {
                        return false;
                    }
                } else if (toLetter.has(value)) {
                    return false;
                } else {
                    toDigit.set(ch, value);
                    toLetter.set(value, ch);
                }
            }
        }
        return true;
    };

    const rows = board.length;
    const cols = board[0].length;
    const pRows = pattern.length;
    const pCols = pattern[0].length;
    for (let r = 0; r + pRows <= rows; r++) {
        for (let c = 0; c + pCols <= cols; c++) {
            if (matches(r, c)) {
                return [r, c];
            }
        }
    }
    return [-1, -1];
};
