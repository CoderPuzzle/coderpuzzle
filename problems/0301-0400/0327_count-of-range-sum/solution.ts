function countRangeSum(nums: number[], lower: number, upper: number): number {
    const n = nums.length;
    // Range sums become pairs: count i < j with
    // prefix[j] - prefix[i] in [lower, upper] (leading 0 included).
    const prefix: number[] = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }

    const mergeCount = (lo: number, hi: number): number => {
        if (lo >= hi) {
            return 0;
        }
        const mid = Math.floor((lo + hi) / 2);
        // Pairs inside each half first; cross pairs next.
        let count = mergeCount(lo, mid) + mergeCount(mid + 1, hi);

        // Left half is sorted, so for each left prefix the valid right
        // entries form the window [l, r): l skips below-lower, r passes
        // at-most-upper; both pointers only ever move forward.
        let l = mid + 1;
        let r = mid + 1;
        for (let i = lo; i <= mid; i++) {
            while (l <= hi && prefix[l] - prefix[i] < lower) {
                l += 1;
            }
            while (r <= hi && prefix[r] - prefix[i] <= upper) {
                r += 1;
            }
            count += r - l;
        }

        // Standard merge re-sorts the range, restoring the invariant
        // the parent level relies on.
        const left = prefix.slice(lo, mid + 1);
        const right = prefix.slice(mid + 1, hi + 1);
        const merged: number[] = [];
        let i = 0,
            j = 0;
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                merged.push(left[i]);
                i += 1;
            } else {
                merged.push(right[j]);
                j += 1;
            }
        }
        while (i < left.length) {
            merged.push(left[i]);
            i += 1;
        }
        while (j < right.length) {
            merged.push(right[j]);
            j += 1;
        }
        for (let k = 0; k < merged.length; k++) {
            prefix[lo + k] = merged[k];
        }
        return count;
    };

    return mergeCount(0, n);
}
