/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */
var maximizeXor = function (nums, queries) {
    const sortedNums = nums.slice().sort((a, b) => a - b);
    const order = [];
    for (let idx = 0; idx < queries.length; idx++) {
        order.push([queries[idx][1], queries[idx][0], idx]);
    }
    order.sort((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        if (a[1] !== b[1]) return a[1] - b[1];
        return a[2] - b[2];
    });
    const answers = new Array(queries.length).fill(0);
    // trie node arrays: child[node][bit]
    const child = [[-1, -1]];
    let ptr = 0;
    const n = sortedNums.length;
    // Offline: with nums and queries both sorted by threshold, the trie
    // holds exactly the values <= mi when a query runs, so the filter
    // costs nothing at query time.
    for (const [mi, xi, idx] of order) {
        // ptr only moves forward — each number enters the trie once.
        // 30 levels (bit 29 down to 0) cover every value < 2^30.
        while (ptr < n && sortedNums[ptr] <= mi) {
            let node = 0;
            const v = sortedNums[ptr];
            for (let bit = 29; bit >= 0; bit--) {
                const b = (v >>> bit) & 1;
                if (child[node][b] === -1) {
                    child[node][b] = child.length;
                    child.push([-1, -1]);
                }
                node = child[node][b];
            }
            ptr++;
        }
        if (ptr === 0) {
            // Threshold admits no element yet — no candidate exists.
            answers[idx] = -1;
            continue;
        }
        let node = 0;
        let best = 0;
        // Greedy descent from the MSB: prefer the complement child so this
        // result bit becomes 1; settle for the matching child otherwise.
        for (let bit = 29; bit >= 0; bit--) {
            const xb = (xi >>> bit) & 1;
            const want = 1 - xb;
            if (child[node][want] !== -1) {
                best += Math.pow(2, bit);
                node = child[node][want];
            } else {
                node = child[node][xb];
            }
        }
        answers[idx] = best;
    }
    return answers;
};
