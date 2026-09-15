class Solution {

    public int getIndex(ArrayReader reader) {
        // Divide and conquer: compare two equal-length halves of the
        // current range and recurse into whichever sums higher — the
        // large entry inflates exactly one side. An odd-length range
        // peels off its middle element first; a tied comparison of the
        // remaining equal-length halves means that peeled element is the
        // large one.
        return solve(reader, 0, reader.length() - 1);
    }

    private int solve(ArrayReader reader, int l, int r) {
        if (l == r) {
            return l;
        }
        int length = r - l + 1;
        int mid = (l + r) / 2;
        if (length % 2 == 0) {
            int cmp = reader.compareSub(l, mid, mid + 1, r);
            return cmp > 0 ? solve(reader, l, mid) : solve(reader, mid + 1, r);
        }
        int cmp = reader.compareSub(l, mid - 1, mid + 1, r);
        if (cmp == 0) {
            return mid;
        }
        return cmp > 0 ? solve(reader, l, mid - 1) : solve(reader, mid + 1, r);
    }
}
