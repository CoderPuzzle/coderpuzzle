/**
 * @param {number[][]} cuboids
 * @return {number}
 */
var maxHeight = function (cuboids) {
    // Rotations are free, so sort each cuboid's dimensions — largest up is
    // simultaneously tallest and least constrained — then sort the cuboids
    // lexicographically so a potential base precedes its tippers.
    const boxes = cuboids
        .map((c) => c.slice().sort((a, b) => a - b))
        .sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
    const n = boxes.length;
    // dp[i]: tallest stack with cuboid i on top.
    const dp = boxes.map((b) => b[2]);
    for (let i = 0; i < n; i++) {
        // An earlier j whose sorted triple is component-wise <= i's can
        // support it (non-strict: equal dimensions may touch).
        for (let j = 0; j < i; j++) {
            if (boxes[j][0] <= boxes[i][0] && boxes[j][1] <= boxes[i][1] && boxes[j][2] <= boxes[i][2]) {
                if (dp[j] + boxes[i][2] > dp[i]) {
                    dp[i] = dp[j] + boxes[i][2];
                }
            }
        }
    }
    return Math.max(...dp);
};
