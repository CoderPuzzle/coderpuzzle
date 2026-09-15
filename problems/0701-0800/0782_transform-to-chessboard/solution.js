/**
 * @param {number[][]} board
 * @return {number}
 */
var movesToChessboard = function (board) {
    // Row and column swaps preserve the XOR of any rectangle's four corners,
    // and that XOR is 0 on every chessboard, so a solvable board must repeat
    // one row (or its complement) everywhere.
    const n = board.length;
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < n; ++j) {
            if (board[0][0] ^ board[0][j] ^ board[i][0] ^ board[i][j]) {
                return -1;
            }
        }
    }
    // The first row and first column must each be rearrangeable into an
    // alternating pattern, so both need n/2 (or (n+1)/2) ones.
    const half = Math.floor(n / 2);
    const ceilHalf = Math.floor((n + 1) / 2);
    let rowOnes = 0;
    let colOnes = 0;
    for (let i = 0; i < n; ++i) {
        rowOnes += board[0][i];
        colOnes += board[i][0];
    }
    const fits = (ones) => ones === half || ones === ceilHalf;
    if (!fits(rowOnes) || !fits(colOnes)) {
        return -1;
    }
    // Count rows/columns already sitting where the pattern starting with 0
    // wants them; each swap corrects two misplaced ones.
    let rowMatches = 0;
    let colMatches = 0;
    for (let i = 0; i < n; ++i) {
        if (board[i][0] === i % 2) {
            rowMatches++;
        }
        if (board[0][i] === i % 2) {
            colMatches++;
        }
    }
    let rowSwaps;
    let colSwaps;
    if (n % 2 === 0) {
        // Both alternating patterns are available; either way to pair the
        // misplaced entries is fair game, so take the cheaper.
        rowSwaps = Math.min(rowMatches, n - rowMatches);
        colSwaps = Math.min(colMatches, n - colMatches);
    } else {
        // Odd n pins the pattern by its majority value, and the true
        // mismatch count is the even member of each pair.
        rowSwaps = rowMatches % 2 === 0 ? rowMatches : n - rowMatches;
        colSwaps = colMatches % 2 === 0 ? colMatches : n - colMatches;
    }
    return (rowSwaps + colSwaps) / 2;
};
