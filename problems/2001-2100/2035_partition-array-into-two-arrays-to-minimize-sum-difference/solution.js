/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumDifference = function (nums) {
    const half = nums.length >> 1;

    // Bucket each half's subset sums by how many elements produced them;
    // a half of length <= 15 keeps this at most 2^15 entries.
    const subsetSumsByCount = (from, to) => {
        const m = to - from;
        const res = Array.from({ length: m + 1 }, () => []);
        for (let mask = 0; mask < 1 << m; mask++) {
            let cnt = 0;
            for (let t = mask; t > 0; t &= t - 1) cnt++;
            let total = 0;
            for (let i = 0; i < m; i++) {
                if ((mask >> i) & 1) {
                    total += nums[from + i];
                }
            }
            res[cnt].push(total);
        }
        return res;
    };

    const A = subsetSumsByCount(0, half);
    const B = subsetSumsByCount(half, nums.length);

    let total = 0;
    for (const v of nums) total += v;

    // If the first half contributes c elements with sum a, the second half
    // must contribute exactly half-c elements with sum b — both sides then
    // have `half` elements and difference |total - 2(a+b)|.
    let ans = Infinity;
    for (let c = 0; c <= half; c++) {
        const Bc = B[half - c].slice().sort((x, y) => x - y);
        for (const a of A[c]) {
            // b >= total/2 - a  <=>  2*b >= total - 2*a (exact integers)
            const want = total - 2 * a;
            let lo = 0,
                hi = Bc.length;
            while (lo < hi) {
                const mid = (lo + hi) >> 1;
                if (2 * Bc[mid] < want) {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            // The closest b sits on one side of the insertion point — try both.
            const idx = lo;
            if (idx < Bc.length) {
                const d = Math.abs(total - 2 * (a + Bc[idx]));
                if (d < ans) ans = d;
            }
            if (idx > 0) {
                const d = Math.abs(total - 2 * (a + Bc[idx - 1]));
                if (d < ans) ans = d;
            }
        }
    }
    return ans;
};
