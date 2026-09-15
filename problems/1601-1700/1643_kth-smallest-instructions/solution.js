/**
 * @param {number[]} destination
 * @param {number} k
 * @return {string}
 */
var kthSmallestPath = function (destination, k) {
    const row = destination[0];
    const col = destination[1];
    const n = row + col;
    // binom[i][j] = C(i, j), built as Pascal's triangle up to n so every
    // count is available without computing a factorial; row, col <= 15
    // keeps every entry well under Number.MAX_SAFE_INTEGER.
    const binom = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= n; i++) {
        binom[i][0] = 1;
        binom[i][i] = 1;
        for (let j = 1; j < i; j++) {
            binom[i][j] = binom[i - 1][j - 1] + binom[i - 1][j];
        }
    }

    let remainingH = col;
    let remainingV = row;
    const path = [];
    for (let step = 0; step < n; step++) {
        if (remainingH === 0) {
            path.push("V");
            remainingV--;
        } else if (remainingV === 0) {
            path.push("H");
            remainingH--;
        } else {
            // Completions starting with 'H': the remaining (remainingH -
            // 1) H's and remainingV V's fill the rest of the string in
            // any order, so this count is C(remainingH - 1 + remainingV,
            // remainingV).
            const countIfH = binom[remainingH - 1 + remainingV][remainingV];
            if (k <= countIfH) {
                path.push("H");
                remainingH--;
            } else {
                k -= countIfH;
                path.push("V");
                remainingV--;
            }
        }
    }
    return path.join("");
};
