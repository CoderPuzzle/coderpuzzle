/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var kthLargestValue = function (matrix, k) {
    // A coordinate value is the XOR of the upper-left submatrix ending
    // there, and XOR cancels itself: prefix[a][b] = matrix[a][b]
    // ^ prefix[a-1][b] ^ prefix[a][b-1] ^ prefix[a-1][b-1]. Sweeping row
    // by row, the running XOR of the current row folded with the
    // previous prefix row yields the new row in O(n) space; collect all
    // m * n values, sort, and the kth largest sits k from the end.
    const n = matrix[0].length;
    let above = new Array(n).fill(0);
    const values = [];
    for (const row of matrix) {
        let left = 0;
        const current = new Array(n);
        for (let j = 0; j < n; j += 1) {
            left ^= row[j];
            current[j] = left ^ above[j];
            values.push(current[j]);
        }
        above = current;
    }
    values.sort((a, b) => a - b);
    return values[values.length - k];
};
