/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {boolean}
 */
var areSimilar = function (mat, k) {
    // After k steps an even row is its original left-rotated by k and an
    // odd row its original right-rotated by k, both mod the row length.
    // A row is invariant under rotation by d exactly when it is invariant
    // under -d, so one modular comparison per cell settles both parities
    // and no intermediate matrices are built.
    const n = mat[0].length;
    const d = k % n;
    if (d === 0) return true;
    for (const row of mat) {
        for (let j = 0; j < n; j++) {
            if (row[j] !== row[(j + d) % n]) return false;
        }
    }
    return true;
};
