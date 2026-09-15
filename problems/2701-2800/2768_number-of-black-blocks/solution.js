/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} coordinates
 * @return {number[]}
 */
var countBlackBlocks = function (m, n, coordinates) {
    const counts = new Map();
    for (const [x, y] of coordinates) {
        for (let bx = x - 1; bx <= x; bx++) {
            for (let by = y - 1; by <= y; by++) {
                if (bx >= 0 && bx < m - 1 && by >= 0 && by < n - 1) {
                    const key = bx * n + by;
                    counts.set(key, (counts.get(key) ?? 0) + 1);
                }
            }
        }
    }
    const answer = new Array(5).fill(0);
    answer[0] = (m - 1) * (n - 1) - counts.size;
    for (const count of counts.values()) {
        answer[count]++;
    }
    return answer;
};
