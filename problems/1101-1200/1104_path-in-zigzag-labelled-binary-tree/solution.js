/**
 * @param {number} label
 * @return {number[]}
 */
var pathInZigZagTree = function (label) {
    // Walk up level by level using each node's position within its row. The
    // parent of the node at position p sits at position p / 2 in the row
    // above, in every row; only the label-to-position mapping flips
    // direction between rows. Fill the result from the back so the path
    // comes out root-first without a separate reverse.
    let level = 0;
    for (let v = label; v > 1; v >>= 1) ++level;
    const result = new Array(level + 1);
    let cur = label;
    for (let i = level; i >= 0; --i) {
        result[i] = cur;
        if (i === 0) break;
        const low = 1 << i;
        const high = (1 << (i + 1)) - 1;
        const position = i % 2 === 0 ? cur - low : high - cur;
        const parentPosition = Math.floor(position / 2);
        const plow = 1 << (i - 1);
        const phigh = (1 << i) - 1;
        cur = (i - 1) % 2 === 0 ? plow + parentPosition : phigh - parentPosition;
    }
    return result;
};
