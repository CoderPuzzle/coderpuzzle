/**
 * @param {string} dominoes
 * @return {string}
 */
var pushDominoes = function (dominoes) {
    const n = dominoes.length;
    // Skip simulation: accumulate signed force. Left to right, an
    // R plants a sentinel force n and an L kills it; the force
    // decays one per step and never drops below zero.
    const forces = new Array(n).fill(0);
    let f = 0;
    for (let i = 0; i < n; i++) {
        if (dominoes[i] === "R") {
            f = n;
        } else if (dominoes[i] === "L") {
            f = 0;
        } else {
            f = Math.max(f - 1, 0);
        }
        forces[i] += f;
    }
    // Mirror pass: L plants the force and R blocks it; subtracting
    // leaves the difference between the opposing pushes.
    f = 0;
    for (let i = n - 1; i >= 0; i--) {
        if (dominoes[i] === "L") {
            f = n;
        } else if (dominoes[i] === "R") {
            f = 0;
        } else {
            f = Math.max(f - 1, 0);
        }
        forces[i] -= f;
    }
    // Sign decides: positive falls right, negative left, and zero
    // means the pushes balance — or nothing reached it.
    let res = "";
    for (let i = 0; i < n; i++) {
        res += forces[i] === 0 ? "." : forces[i] > 0 ? "R" : "L";
    }
    return res;
};
