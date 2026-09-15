/**
 * @param {string} bottom
 * @param {string[]} allowed
 * @return {boolean}
 */
var pyramidTransition = function (bottom, allowed) {
    // For each ordered pair of letters, a bitmask of the letters that may
    // sit on it. A pair with no pattern is a dead end: mask 0.
    const tops = new Int32Array(26 * 26);
    for (const t of allowed) {
        tops[(t.charCodeAt(0) - 65) * 26 + (t.charCodeAt(1) - 65)] |= 1 << (t.charCodeAt(2) - 65);
    }
    let rows = new Set([bottom]);
    let width = bottom.length;
    while (width > 1) {
        const above = new Set();
        for (const row of rows) {
            // Candidate letters per position of the row above; a zero mask
            // means this row cannot carry anything.
            const masks = [];
            let alive = true;
            for (let i = 0; i + 1 < width; i++) {
                const mask = tops[(row.charCodeAt(i) - 65) * 26 + (row.charCodeAt(i + 1) - 65)];
                if (mask === 0) {
                    alive = false;
                    break;
                }
                masks.push(mask);
            }
            if (!alive) continue;
            // The state stays a whole concrete row: adjacent positions
            // above share the row below, so the letter at one position
            // constrains its neighbor. Enumerate the product of the masks;
            // the set dedups rows lifted from different parents.
            let frontier = [""];
            for (const mask of masks) {
                const lifted = [];
                for (const r of frontier) {
                    for (let d = 0; d < 6; d++) {
                        if ((mask >> d) % 2 === 1) {
                            lifted.push(r + String.fromCharCode(65 + d));
                        }
                    }
                }
                frontier = lifted;
            }
            for (const r of frontier) above.add(r);
        }
        if (above.size === 0) return false;
        rows = above;
        width--;
    }
    return true;
};
