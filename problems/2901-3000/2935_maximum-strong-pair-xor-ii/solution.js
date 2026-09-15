/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumStrongPairXor = function (nums) {
    // Sorted sweep with a sliding window [ceil(y/2), y]: a binary trie
    // over the 20 value bits, each node carrying a count of live window
    // values, answers "best XOR partner of y in the window" greedily.
    // The left pointer retires values whose doubling falls below y.
    nums.sort((a, b) => a - b);
    const BITS = 20; // nums[i] <= 2^20 - 1
    const child = [[0, 0]];
    const cnt = [0];
    let best = 0;
    let left = 0;
    for (const y of nums) {
        // insert y
        let node = 0;
        for (let b = BITS - 1; b >= 0; --b) {
            const d = (y >> b) & 1;
            let nxt = child[node][d];
            if (nxt === 0) {
                child.push([0, 0]);
                cnt.push(0);
                nxt = child.length - 1;
                child[node][d] = nxt;
            }
            node = nxt;
            ++cnt[node];
        }
        // retire x from the left while 2 * x < y
        while (2 * nums[left] < y) {
            const x = nums[left];
            let node2 = 0;
            for (let b = BITS - 1; b >= 0; --b) {
                node2 = child[node2][(x >> b) & 1];
                --cnt[node2];
            }
            ++left;
        }
        // query: prefer the opposite bit while that subtree is live
        let node3 = 0;
        let res = 0;
        for (let b = BITS - 1; b >= 0; --b) {
            const d = (y >> b) & 1;
            const want = child[node3][d ^ 1];
            if (want !== 0 && cnt[want] > 0) {
                res |= 1 << b;
                node3 = want;
            } else {
                node3 = child[node3][d];
            }
        }
        best = Math.max(best, res);
    }
    return best;
};
