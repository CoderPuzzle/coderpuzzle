/**
 * @param {number[]} nums
 * @return {boolean}
 */
var circularArrayLoop = function (nums) {
    const n = nums.length;
    // Every index has exactly one successor, so each walk either closes
    // a loop or dies; 0 unseen, 1 on the current walk, 2 proven dead.
    const state = new Array(n).fill(0);
    for (let start = 0; start < n; ++start) {
        if (state[start] !== 0) continue;
        const path = [];
        let node = start;
        while (state[node] === 0) {
            state[node] = 1;
            path.push(node);
            const next = (((node + nums[node]) % n) + n) % n;
            // A legal loop keeps one direction and more than one node,
            // so a sign flip or a hop back to self kills this chain.
            if (nums[next] * nums[node] < 0 || next === node) break;
            node = next;
            if (state[node] === 1) return true;
        }
        for (const walked of path) state[walked] = 2;
    }
    return false;
};
