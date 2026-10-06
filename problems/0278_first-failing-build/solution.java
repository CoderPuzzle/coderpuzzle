class Solution {

    public int locateFirstFailure(BuildInspector buildInspector, int n) {
        // The predicate flips exactly once along [1, n] — good up to the
        // hidden boundary, bad from it on — so bisect for the first true.
        int lo = 1;
        int hi = n;
        while (lo < hi) {
            // Overflow-safe midpoint: lo + (hi - lo) / 2 never exceeds hi,
            // where (lo + hi) / 2 overflows int on the full
            // [1, 2147483647] range.
            int mid = lo + (hi - lo) / 2;
            if (buildInspector.isFailingBuild(mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }
}
