/**
 * @param {number[][]} circles
 * @return {number}
 */
var countLatticePoints = function (circles) {
    const seen = new Set();
    for (const [x, y, r] of circles) {
        for (let px = x - r; px <= x + r; px++) {
            for (let py = y - r; py <= y + r; py++) {
                if ((px - x) ** 2 + (py - y) ** 2 <= r * r) {
                    seen.add(px * 1024 + py);
                }
            }
        }
    }
    return seen.size;
};
