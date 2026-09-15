/**
 * @param {number[][]} fruits
 * @return {number}
 */
var maxCollectedFruits = function (fruits) {
    // Child 1 is pinned to the main diagonal. Children 2 and 3 each
    // walk their own off-diagonal triangle in n-1 steps (their row /
    // column advances one per move, and the diagonal can only be
    // touched by spending every later move on it, which collects
    // nothing), so solve them independently; diagonal cells and the
    // shared final cell are counted once, via the diagonal. Child 3 is
    // child 2 with the grid transposed (swapped reads).
    const n = fruits.length;
    let total = 0;
    for (let i = 0; i < n; i++) {
        total += fruits[i][i];
    }
    const triangle = (swapped) => {
        // Best walk from the top-right corner, one row per step,
        // staying strictly right of the diagonal, final cell excluded
        // (-1 marks not-yet-reachable cells; values >= 0).
        const cell = (i, j) => (swapped ? fruits[j][i] : fruits[i][j]);
        let prev = new Array(n).fill(-1);
        prev[n - 1] = cell(0, n - 1);
        for (let i = 1; i < n - 1; i++) {
            const cur = new Array(n).fill(-1);
            for (let j = i + 1; j < n; j++) {
                let best = prev[j - 1];
                if (prev[j] > best) {
                    best = prev[j];
                }
                if (j + 1 < n && prev[j + 1] > best) {
                    best = prev[j + 1];
                }
                if (best >= 0) {
                    cur[j] = best + cell(i, j);
                }
            }
            prev = cur;
        }
        return prev[n - 1];
    };
    return total + triangle(false) + triangle(true);
};
