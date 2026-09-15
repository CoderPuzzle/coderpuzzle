/**
 * @param {number[]} parent
 * @param {number[]} nums
 * @return {number}
 */
var weightedSum = function (parent, nums) {
    const n = parent.length;
    const children = Array.from({ length: n }, () => []);
    for (let i = 1; i < n; ++i) {
        children[parent[i]].push(i);
    }

    const depth = new Array(n).fill(0);
    const queue = [];
    depth[0] = 1;
    queue.push(0);
    for (let head = 0; head < queue.length; ++head) {
        const node = queue[head];
        for (const child of children[node]) {
            depth[child] = depth[node] + 1;
            queue.push(child);
        }
    }

    let height = 0;
    for (let i = 0; i < n; ++i) {
        height = Math.max(height, depth[i]);
    }

    let total = 0;
    for (let i = 0; i < n; ++i) {
        total += nums[i] * (height - depth[i] + 1);
    }
    return total;
};
