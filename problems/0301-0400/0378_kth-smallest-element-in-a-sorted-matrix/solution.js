/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (matrix, k) {
    const n = matrix.length;
    const countLe = (x) => {
        // Staircase walk from bottom-left: elements <= x.
        let count = 0;
        let row = n - 1,
            col = 0;
        while (row >= 0 && col < n) {
            if (matrix[row][col] <= x) {
                count += row + 1;
                col++;
            } else {
                row--;
            }
        }
        return count;
    };
    let lo = matrix[0][0],
        hi = matrix[n - 1][n - 1];
    while (lo < hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        if (countLe(mid) >= k) hi = mid;
        else lo = mid + 1;
    }
    return lo;
};
