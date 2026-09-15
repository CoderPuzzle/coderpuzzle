class Solution {

    // Binary search the answer m. m == 1 needs full alternation, so the cost
    // is the smaller Hamming distance to one of the two alternating targets;
    // for m >= 2 a run of length L independently costs floor(L / (m + 1))
    // flips, all placeable strictly inside the run so runs never merge.
    public int minLength(String s, int numOps) {
        int n = s.length();
        int lo = 1,
            hi = n;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (ok(s, numOps, mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

    private boolean ok(String s, int numOps, int m) {
        int n = s.length();
        if (m == 1) {
            int alt = 0;
            for (int i = 0; i < n; i++) {
                if (s.charAt(i) != "01".charAt(i % 2)) {
                    alt++;
                }
            }
            return Math.min(alt, n - alt) <= numOps;
        }
        int flips = 0,
            run = 1;
        for (int i = 1; i < n; i++) {
            if (s.charAt(i) == s.charAt(i - 1)) {
                run++;
            } else {
                flips += run / (m + 1);
                run = 1;
            }
        }
        return flips + run / (m + 1) <= numOps;
    }
}
