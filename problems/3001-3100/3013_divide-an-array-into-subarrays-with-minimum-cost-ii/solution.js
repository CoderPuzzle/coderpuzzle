/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} dist
 * @return {number}
 */
var minimumCost = function (nums, k, dist) {
    const n = nums.length;
    const target = k - 2;
    const comp = Array.from(new Set(nums)).sort((a, b) => a - b);
    const m = comp.length;
    const posOf = new Map();
    for (let i = 0; i < m; i++) posOf.set(comp[i], i);

    const countBit = new Array(m + 1).fill(0);
    const sumBit = new Array(m + 1).fill(0);

    function fenAdd(bit, index, delta) {
        let i = index + 1;
        while (i <= m) {
            bit[i] += delta;
            i += i & -i;
        }
    }

    function fenPrefix(bit, index) {
        // sum over [0, index]; index may be < 0
        if (index < 0) return 0;
        if (index >= m) index = m - 1;
        let i = index + 1;
        let total = 0;
        while (i > 0) {
            total += bit[i];
            i -= i & -i;
        }
        return total;
    }

    function kth(targetK) {
        // 0-based index of the targetK-th smallest element (targetK >= 1)
        let idx = 0;
        let bitmask = 1;
        while (bitmask * 2 <= m) bitmask *= 2;
        let remaining = targetK;
        while (bitmask > 0) {
            const nxt = idx + bitmask;
            if (nxt <= m && countBit[nxt] < remaining) {
                idx = nxt;
                remaining -= countBit[nxt];
            }
            bitmask = Math.floor(bitmask / 2);
        }
        return idx;
    }

    function sumKSmallest(count) {
        if (count === 0) return 0;
        const idx = kth(count);
        const before = fenPrefix(countBit, idx - 1);
        const sumBefore = fenPrefix(sumBit, idx - 1);
        return sumBefore + (count - before) * comp[idx];
    }

    function addValue(v) {
        const j = posOf.get(v);
        fenAdd(countBit, j, 1);
        fenAdd(sumBit, j, v);
    }

    function removeValue(v) {
        const j = posOf.get(v);
        fenAdd(countBit, j, -1);
        fenAdd(sumBit, j, -v);
    }

    const right0 = Math.min(1 + dist, n - 1);
    for (let p = 2; p <= right0; p++) {
        addValue(nums[p]);
    }

    let ans = null;
    for (let i1 = 1; i1 < n; i1++) {
        const left = i1 + 1;
        const right = Math.min(i1 + dist, n - 1);
        if (right - left + 1 >= target) {
            const cost = nums[0] + nums[i1] + sumKSmallest(target);
            if (ans === null || cost < ans) ans = cost;
        }
        if (left <= n - 1) {
            removeValue(nums[left]);
        }
        const newRight = i1 + 1 + dist;
        if (newRight <= n - 1) {
            addValue(nums[newRight]);
        }
    }
    return ans;
};
