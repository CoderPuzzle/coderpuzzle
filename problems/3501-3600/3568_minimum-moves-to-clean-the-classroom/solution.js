/**
 * @param {string[]} classroom
 * @param {number} energy
 * @return {number}
 */
var minMoves = function (classroom, energy) {
    // BFS over (cell, collected-litter mask, energy left), one layer per
    // move. best[r * n + c][mask] keeps the largest energy that state was
    // reached with; a new arrival is only worth keeping when it carries
    // strictly more energy, because anything a weaker arrival can finish,
    // a stronger one at the same or smaller depth finishes no later. An
    // 'R' cell restores the tank on arrival, and the search returns the
    // moment a move lands on the last uncollected litter.
    const m = classroom.length;
    const n = classroom[0].length;
    const bits = Array.from({ length: m }, () => new Array(n).fill(-1));
    let sr = 0,
        sc = 0,
        litter = 0;
    for (let r = 0; r < m; ++r) {
        for (let c = 0; c < n; ++c) {
            if (classroom[r][c] === "S") {
                sr = r;
                sc = c;
            } else if (classroom[r][c] === "L") {
                bits[r][c] = litter++;
            }
        }
    }
    const full = (1 << litter) - 1;
    if (full === 0) {
        return 0;
    }
    const stride = full + 1;
    const best = new Int32Array(m * n * stride).fill(-1);
    best[(sr * n + sc) * stride] = energy;
    let layer = [[sr, sc, 0, energy]];
    let moves = 0;
    while (layer.length > 0) {
        ++moves;
        const nxt = [];
        for (const [r, c, mask, e] of layer) {
            for (const [nr, nc] of [
                [r - 1, c],
                [r + 1, c],
                [r, c - 1],
                [r, c + 1],
            ]) {
                if (nr < 0 || nr >= m || nc < 0 || nc >= n || classroom[nr][nc] === "X") {
                    continue;
                }
                const ch = classroom[nr][nc];
                const ne = ch === "R" ? energy : e - 1;
                if (ch !== "R" && ne < 0) {
                    continue; // an empty tank only allows staying on an 'R'
                }
                const nmask = ch === "L" ? mask | (1 << bits[nr][nc]) : mask;
                if (nmask === full) {
                    return moves;
                }
                const idx = (nr * n + nc) * stride + nmask;
                if (ne > best[idx]) {
                    best[idx] = ne;
                    nxt.push([nr, nc, nmask, ne]);
                }
            }
        }
        layer = nxt;
    }
    return -1;
};
