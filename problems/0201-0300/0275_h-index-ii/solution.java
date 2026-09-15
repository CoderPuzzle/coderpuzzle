class Solution {

    public int hIndex(int[] citations) {
        // The array is sorted, so exactly n - i papers (index i to the end)
        // hold citations[i] or more: the test citations[i] >= n - i asks
        // whether h = n - i is achievable. citations never decreases while
        // n - i strictly does, so the test reads false ... false,
        // true ... true along the array — bisect for its first true.
        int n = citations.length;
        int lo = 0;
        int hi = n;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (citations[mid] < n - mid) {
                // Too few citations at mid, and every smaller index is
                // worse: the first qualifying paper sits strictly right.
                lo = mid + 1;
            } else {
                // mid itself qualifies: the first one is at mid or left.
                hi = mid;
            }
        }
        // n - lo papers from lo on each have >= n - lo citations; when
        // nothing qualifies lo == n and h falls out as 0.
        return n - lo;
    }
}
