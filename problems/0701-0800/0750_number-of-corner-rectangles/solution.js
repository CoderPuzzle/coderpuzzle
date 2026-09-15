/**
 * @param {number[][]} grid
 * @return {number}
 */
var countCornerRectangles = function (grid) {
    // Scan the rows top to bottom. Every pair of 1-columns in the current row
    // completes one rectangle with each earlier row that already showed the
    // same column pair, so a counter on column pairs charges exactly one unit
    // of work per rectangle.
    const n = grid[0].length;
    const pairRows = new Map();
    let total = 0;
    for (const row of grid) {
        const ones = [];
        for (let c = 0; c < n; ++c) {
            if (row[c] === 1) {
                ones.push(c);
            }
        }
        for (let i = 0; i < ones.length; ++i) {
            const base = ones[i] * n;
            for (let j = i + 1; j < ones.length; ++j) {
                const key = base + ones[j];
                const earlier = pairRows.get(key) ?? 0;
                total += earlier;
                pairRows.set(key, earlier + 1);
            }
        }
    }
    return total;
};
