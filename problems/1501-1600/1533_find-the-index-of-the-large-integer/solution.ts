class Solution {
    getIndex(reader: ArrayReader): number {
        // Divide and conquer: compare two equal-length halves of the
        // current range and recurse into whichever sums higher — the
        // large entry inflates exactly one side. An odd-length range
        // peels off its middle element first; a tied comparison of the
        // remaining equal-length halves means that peeled element is the
        // large one.
        const solve = (l: number, r: number): number => {
            if (l === r) {
                return l;
            }
            const length = r - l + 1;
            const mid = Math.floor((l + r) / 2);
            if (length % 2 === 0) {
                const cmp = reader.compareSub(l, mid, mid + 1, r);
                return cmp > 0 ? solve(l, mid) : solve(mid + 1, r);
            }
            const cmp = reader.compareSub(l, mid - 1, mid + 1, r);
            if (cmp === 0) {
                return mid;
            }
            return cmp > 0 ? solve(l, mid - 1) : solve(mid + 1, r);
        };
        return solve(0, reader.length() - 1);
    }
}
