/**
 * @param {string[][]} seats
 * @return {number}
 */
var maxStudents = function (seats) {
    const m = seats.length;
    const n = seats[0].length;

    const popcount = (x) => {
        let c = 0;
        while (x > 0) {
            c += x & 1;
            x >>>= 1;
        }
        return c;
    };

    const rowMasks = [];
    for (const row of seats) {
        const masks = [];
        for (let mask = 0; mask < 1 << n; mask++) {
            let ok = true;
            for (let c = 0; c < n; c++) {
                if ((mask >> c) & 1) {
                    if (row[c] === "#") {
                        ok = false;
                        break;
                    }
                    if (c > 0 && (mask >> (c - 1)) & 1) {
                        ok = false;
                        break;
                    }
                }
            }
            if (ok) masks.push(mask);
        }
        rowMasks.push(masks);
    }

    // dp over rows: states maps previous row's mask -> best count so far.
    let states = new Map([[0, 0]]);
    for (let i = 0; i < m; i++) {
        const newStates = new Map();
        for (const mask of rowMasks[i]) {
            let best = -1;
            for (const [prev, val] of states) {
                // no student directly above-left or above-right
                if ((mask & ((prev << 1) | (prev >> 1))) !== 0) continue;
                if (val > best) best = val;
            }
            if (best >= 0) {
                const v = best + popcount(mask);
                if (!newStates.has(mask) || v > newStates.get(mask)) {
                    newStates.set(mask, v);
                }
            }
        }
        states = newStates;
    }
    let ans = 0;
    for (const val of states.values()) {
        if (val > ans) ans = val;
    }
    return ans;
};
