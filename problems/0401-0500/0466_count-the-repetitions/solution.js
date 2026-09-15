/**
 * @param {string} s1
 * @param {number} n1
 * @param {string} s2
 * @param {number} n2
 * @return {number}
 */
var getMaxRepetitions = function (s1, n1, s2, n2) {
    // Walk str1 one s1-block at a time. The only state crossing a block
    // boundary is the cursor into s2 plus the copies consumed so far, and
    // the cursor alone decides how any later block plays out — so a
    // repeated cursor exposes a cycle that can be jumped arithmetically.
    const seen = new Map();
    let cursor = 0;
    let copies = 0;
    let blocks = 0;
    while (blocks < n1) {
        for (let i = 0; i < s1.length; ++i) {
            if (s1[i] === s2[cursor]) {
                cursor++;
                if (cursor === s2.length) {
                    cursor = 0;
                    copies++;
                }
            }
        }
        blocks++;
        if (seen.has(cursor)) {
            // Every cycle of blocks adds a fixed number of copies; take as
            // many whole cycles as fit, then walk the leftovers by hand.
            const start = seen.get(cursor);
            const jumps = Math.floor((n1 - blocks) / (blocks - start[0]));
            copies += jumps * (copies - start[1]);
            blocks += jumps * (blocks - start[0]);
            seen.clear();
        } else {
            seen.set(cursor, [blocks, copies]);
        }
    }
    return Math.floor(copies / n2);
};
