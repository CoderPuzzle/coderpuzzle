/**
 * @param {number[]} lane1
 * @param {number[]} lane2
 * @return {number}
 */
var maxCoins = function (lane1, lane2) {
    const NEG = -Infinity;

    const n = lane1.length;
    // prev1[r] / prev2[r]: best coins for a ride ending at the previous mile,
    // in lane 1 / lane 2, with r lane switches still remaining.
    let prev1 = [NEG, NEG, NEG];
    let prev2 = [NEG, NEG, NEG];
    let best = NEG;
    for (let i = 0; i < n; i++) {
        const v1 = lane1[i];
        const v2 = lane2[i];
        let cur1 = [NEG, NEG, NEG];
        let cur2 = [NEG, NEG, NEG];
        // fresh start at mile i (enter on lane 1, may switch immediately)
        cur1[2] = Math.max(cur1[2], v1);
        cur2[1] = Math.max(cur2[1], v2);
        for (let r = 0; r < 3; r++) {
            if (prev1[r] !== NEG) {
                cur1[r] = Math.max(cur1[r], prev1[r] + v1); // stay in lane 1
                if (r > 0) cur2[r - 1] = Math.max(cur2[r - 1], prev1[r] + v2); // switch to lane 2
            }
            if (prev2[r] !== NEG) {
                cur2[r] = Math.max(cur2[r], prev2[r] + v2); // stay in lane 2
                if (r > 0) cur1[r - 1] = Math.max(cur1[r - 1], prev2[r] + v1); // switch to lane 1
            }
        }
        prev1 = cur1;
        prev2 = cur2;
        for (let r = 0; r < 3; r++) {
            if (prev1[r] > best) best = prev1[r];
            if (prev2[r] > best) best = prev2[r];
        }
    }
    return best;
};
