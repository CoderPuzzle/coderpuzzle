function maxSumSubmatrix(matrix: number[][], k: number): number {
    const m = matrix.length;
    const n = matrix[0].length;
    // prefix[r][c] = sum of the r x c rectangle in the top-left corner;
    // any block is four lookups against this table.
    const prefix: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let r = 1; r <= m; r++) {
        for (let c = 1; c <= n; c++) {
            prefix[r][c] = prefix[r - 1][c] + prefix[r][c - 1] - prefix[r - 1][c - 1] + matrix[r - 1][c - 1];
        }
    }
    // Walk every block by its four corner coordinates and keep the largest
    // total that respects the cap.
    let best = -Infinity;
    for (let top = 0; top < m; top++) {
        for (let bottom = top; bottom < m; bottom++) {
            for (let left = 0; left < n; left++) {
                const pt = prefix[top];
                const pb = prefix[bottom + 1];
                for (let right = left; right < n; right++) {
                    const total = pb[right + 1] - pt[right + 1] - pb[left] + pt[left];
                    if (total <= k && total > best) {
                        best = total;
                    }
                }
            }
        }
    }
    return best;
}
