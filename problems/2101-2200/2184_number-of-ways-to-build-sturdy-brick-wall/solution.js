/**
 * @param {number} height
 * @param {number} width
 * @param {number[]} bricks
 * @return {number}
 */
var buildWall = function (height, width, bricks) {
    // A row is fully described by its internal-joint bitmask; adjacent
    // rows must be disjoint. Enumerate row masks once, then run one map-
    // of-counts transition per row.
    const MOD = 1000000007n;
    const masks = [];
    const buildRows = (position, mask) => {
        if (position === width) {
            masks.push(mask);
            return;
        }
        for (const brick of bricks) {
            if (position + brick > width) {
                continue;
            }
            const next = position + brick;
            buildRows(next, mask | (next < width ? 1 << (next - 1) : 0));
        }
    };
    buildRows(0, 0);
    if (masks.length === 0) {
        return 0;
    }
    let counts = new Map();
    for (const mask of masks) {
        counts.set(mask, 1n);
    }
    for (let row = 1; row < height; ++row) {
        const nextCounts = new Map();
        for (const below of masks) {
            let total = 0n;
            for (const above of masks) {
                if ((above & below) === 0) {
                    total += counts.get(above);
                }
            }
            nextCounts.set(below, total % MOD);
        }
        counts = nextCounts;
    }
    let answer = 0n;
    for (const value of counts.values()) {
        answer = (answer + value) % MOD;
    }
    return Number(answer);
};
