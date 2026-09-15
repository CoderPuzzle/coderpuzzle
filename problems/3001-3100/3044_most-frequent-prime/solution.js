/**
 * @param {number[][]} mat
 * @return {number}
 */
var mostFrequentPrime = function (mat) {
    // From every cell, march each of the eight directions straight to the
    // matrix edge; a path is fully described by its start and direction.
    const directions = [
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
        [-1, -1],
        [-1, 0],
        [-1, 1],
    ];
    const isPrime = (value) => {
        if (value % 2 === 0) return value === 2;
        for (let factor = 3; factor * factor <= value; factor += 2) {
            if (value % factor === 0) return false;
        }
        return true;
    };
    const counts = new Map();
    for (let i = 0; i < mat.length; ++i) {
        for (let j = 0; j < mat[0].length; ++j) {
            for (const [di, dj] of directions) {
                let value = mat[i][j];
                let x = i + di,
                    y = j + dj;
                while (x >= 0 && x < mat.length && y >= 0 && y < mat[0].length) {
                    // Appending one digit materializes the number formed at
                    // this step, so every step tallies on its own.
                    value = value * 10 + mat[x][y];
                    if (value > 10 && isPrime(value)) {
                        counts.set(value, (counts.get(value) ?? 0) + 1);
                    }
                    x += di;
                    y += dj;
                }
            }
        }
    }
    // Highest frequency wins, ties toward the larger prime; no candidate at
    // all leaves the answer at -1.
    let bestValue = -1,
        bestCount = 0;
    for (const [value, count] of counts) {
        if (count > bestCount || (count === bestCount && value > bestValue)) {
            bestValue = value;
            bestCount = count;
        }
    }
    return bestValue;
};
