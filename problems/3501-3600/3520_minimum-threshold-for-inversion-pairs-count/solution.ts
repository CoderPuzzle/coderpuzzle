function minThreshold(nums: number[], k: number): number {
    // count(x) = #{(i, j) : i < j, nums[i] > nums[j], nums[i] - nums[j] <=
    // x} is non-decreasing in x, so binary search the smallest x with
    // count(x) >= k. Each count sweeps left to right with a Fenwick tree
    // over the compressed values, adding for every j the number of earlier
    // elements whose value falls in the window (nums[j], nums[j] + x].
    // n <= 1e4 bounds the pair count by n*(n-1)/2 < 5e7 and every value
    // here stays far below 2^53, so plain numbers are exact.
    const vals = [...new Set(nums)].sort((a, b) => a - b);
    const m = vals.length;
    const maxDiff = vals[m - 1] - vals[0];

    const count = (x: number): number => {
        const tree = new Int32Array(m + 1);
        let total = 0;
        for (const v of nums) {
            // Earlier elements with value in (v, v + x]
            let front = 0,
                back = m;
            while (front < back) {
                const mid = (front + back) >> 1;
                if (vals[mid] <= v + x) {
                    front = mid + 1;
                } else {
                    back = mid;
                }
            }
            const c = bisectLeft(vals, v);
            for (let i = front; i > 0; i -= i & -i) total += tree[i];
            // c is the 0-based compressed index; its Fenwick position is
            // c + 1, so the prefix cut and the insert both start there.
            for (let i = c + 1; i > 0; i -= i & -i) total -= tree[i];
            for (let i = c + 1; i <= m; i += i & -i) tree[i]++;
        }
        return total;
    };

    if (maxDiff === 0 || count(maxDiff) < k) return -1;
    let lo = 1,
        hi = maxDiff;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (count(mid) >= k) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
}

function bisectLeft(vals: number[], v: number): number {
    let lo = 0,
        hi = vals.length;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (vals[mid] < v) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    return lo;
}
