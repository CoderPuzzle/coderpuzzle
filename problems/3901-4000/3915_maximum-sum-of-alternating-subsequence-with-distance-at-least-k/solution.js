/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxAlternatingSum = function (nums, k) {
    const values = [...new Set(nums)].sort((a, b) => a - b);
    const ranks = new Map(values.map((value, index) => [value, index]));
    let size = 1;
    while (size < values.length) size *= 2;
    const upTree = new Array(2 * size).fill(0);
    const downTree = new Array(2 * size).fill(0);

    function update(tree, index, value) {
        index += size;
        tree[index] = Math.max(tree[index], value);
        for (index = Math.floor(index / 2); index > 0; index = Math.floor(index / 2)) {
            tree[index] = Math.max(tree[2 * index], tree[2 * index + 1]);
        }
    }
    function query(tree, left, right) {
        left += size;
        right += size;
        let best = 0;
        while (left < right) {
            if (left & 1) best = Math.max(best, tree[left++]);
            if (right & 1) best = Math.max(best, tree[--right]);
            left = Math.floor(left / 2);
            right = Math.floor(right / 2);
        }
        return best;
    }

    const up = new Array(nums.length).fill(0);
    const down = new Array(nums.length).fill(0);
    let answer = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i >= k) {
            const eligible = i - k;
            const rank = ranks.get(nums[eligible]);
            update(upTree, rank, up[eligible]);
            update(downTree, rank, down[eligible]);
        }
        const rank = ranks.get(nums[i]);
        up[i] = nums[i] + query(downTree, 0, rank);
        down[i] = nums[i] + query(upTree, rank + 1, values.length);
        answer = Math.max(answer, up[i], down[i]);
    }
    // The score is at most 10^10, well below Number.MAX_SAFE_INTEGER.
    return answer;
};
