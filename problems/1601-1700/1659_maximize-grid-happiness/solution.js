/**
 * @param {number} m
 * @param {number} n
 * @param {number} introvertsCount
 * @param {number} extrovertsCount
 * @return {number}
 */
var getMaxGridHappiness = function (m, n, introvertsCount, extrovertsCount) {
    // Fill the grid cell by cell, row-major, and charge every bond when
    // its second member is placed: a newcomer of type v pays its own
    // base (120 for an introvert, 40 for an extrovert) plus, for each
    // of the two neighbours possibly already placed (left, above), both
    // sides of that bond at once — -60 for two introverts, +40 for two
    // extroverts, -10 for a mixed pair. The future only needs the
    // occupancy of the last n filled cells, held as one ternary mask
    // whose trit 0 is the left neighbour and trit n-1 the neighbour
    // above, plus the two budgets left. Every state value stays
    // non-negative (an introvert surrounded on all four sides still
    // nets 0), so -1 cleanly marks unreachable states.
    const width = 3 ** n;
    const span = width / 3;
    const pair = [
        [0, 0, 0],
        [0, -60, -10],
        [0, -10, 40],
    ];
    const fresh = () => Array.from({ length: width }, () => Array.from({ length: 7 }, () => new Array(7).fill(-1)));
    let dp = fresh();
    dp[0][introvertsCount][extrovertsCount] = 0;
    for (let cell = 0; cell < m * n; cell += 1) {
        const hasLeft = cell % n !== 0;
        const hasUp = cell >= n;
        const nxt = fresh();
        for (let mask = 0; mask < width; mask += 1) {
            const left = hasLeft ? mask % 3 : 0;
            const up = hasUp ? Math.floor(mask / span) % 3 : 0;
            const shifted = (mask % span) * 3;
            for (let i = 0; i < 7; i += 1) {
                for (let e = 0; e < 7; e += 1) {
                    const best = dp[mask][i][e];
                    if (best < 0) {
                        continue;
                    }
                    for (const [v, base] of [
                        [0, 0],
                        [1, 120],
                        [2, 40],
                    ]) {
                        if ((v === 1 && i === 0) || (v === 2 && e === 0)) {
                            continue;
                        }
                        let gain = base;
                        if (left !== 0) {
                            gain += pair[v][left];
                        }
                        if (up !== 0) {
                            gain += pair[v][up];
                        }
                        const ni = i - (v === 1 ? 1 : 0);
                        const ne = e - (v === 2 ? 1 : 0);
                        if (best + gain > nxt[shifted + v][ni][ne]) {
                            nxt[shifted + v][ni][ne] = best + gain;
                        }
                    }
                }
            }
        }
        dp = nxt;
    }
    let answer = 0;
    for (const plane of dp) {
        for (const row of plane) {
            for (const value of row) {
                answer = Math.max(answer, value);
            }
        }
    }
    return answer;
};
