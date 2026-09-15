/**
 * @param {string[][]} grid
 * @return {number}
 */
var numberOfSubmatrices = function (grid) {
    // Every counted submatrix contains grid[0][0], so each candidate is
    // exactly the top-left rectangle ending at some cell. A running sum
    // over the current row plus the previous row's prefix sums gives each
    // rectangle's signed balance (X = +1, Y = -1); a parallel array gives
    // its X-count. Count cells whose balance is zero but which hold at
    // least one X.
    const cols = grid[0].length;
    let prevSum = new Array(cols).fill(0);
    let prevX = new Array(cols).fill(0);
    let total = 0;
    for (let r = 0; r < grid.length; ++r) {
        const curSum = new Array(cols).fill(0);
        const curX = new Array(cols).fill(0);
        let runSum = 0;
        let runX = 0;
        const above = r > 0;
        for (let c = 0; c < cols; ++c) {
            const cell = grid[r][c];
            if (cell === "X") {
                ++runSum;
                ++runX;
            } else if (cell === "Y") {
                --runSum;
            }
            let s = runSum;
            let x = runX;
            if (above) {
                // rect(r, c) = row-run + rect(r - 1, c).
                s += prevSum[c];
                x += prevX[c];
            }
            curSum[c] = s;
            curX[c] = x;
            if (s === 0 && x > 0) ++total;
        }
        prevSum = curSum;
        prevX = curX;
    }
    return total;
};
