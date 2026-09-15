/**
 * @param {number[]} nums
 * @return {number}
 */
var countOperationsToEmptyArray = function (nums) {
    const n = nums.length;
    if (n === 0) return 0;

    const tree = new Array(n + 1).fill(0);

    const add = (i, delta) => {
        for (; i <= n; i += i & -i) tree[i] += delta;
    };

    const prefix = (i) => {
        let s = 0;
        for (; i > 0; i -= i & -i) s += tree[i];
        return s;
    };

    let topBit = 1;
    while (topBit * 2 <= n) topBit *= 2;

    const kth = (k) => {
        let idx = 0;
        let bit = topBit;
        while (bit > 0) {
            const nxt = idx + bit;
            if (nxt <= n && tree[nxt] < k) {
                idx = nxt;
                k -= tree[nxt];
            }
            bit = Math.floor(bit / 2);
        }
        return idx + 1;
    };

    for (let i = 1; i <= n; i++) add(i, 1);

    const order = nums.map((_, i) => i).sort((a, b) => nums[a] - nums[b]);
    let ops = 0;
    let cur = 1;
    let removed = 0;
    for (const idx of order) {
        const pos = idx + 1;
        if (pos >= cur) {
            ops += prefix(pos) - prefix(cur - 1);
        } else {
            ops += prefix(n) - prefix(cur - 1) + prefix(pos);
        }
        add(pos, -1);
        removed += 1;
        const remaining = n - removed;
        if (remaining > 0) {
            const rankAfter = prefix(pos);
            const nextRank = (rankAfter % remaining) + 1;
            cur = kth(nextRank);
        }
    }
    return ops;
};
