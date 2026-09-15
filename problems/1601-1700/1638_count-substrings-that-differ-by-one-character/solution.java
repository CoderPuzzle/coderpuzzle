class Solution {

    public int countSubstrings(String s, String t) {
        // same[j] = length of the exact-match run ending at s[i-1], t[j-1].
        // diff[j] = length of the run ending there with exactly one
        // mismatch, counted directly: the mismatch count along a fixed pair
        // of starts is monotone non-decreasing, so this length is exact.
        int n = s.length();
        int m = t.length();
        int[] samePrev = new int[m + 1];
        int[] diffPrev = new int[m + 1];
        long total = 0;
        for (int i = 1; i <= n; i++) {
            int[] sameCurr = new int[m + 1];
            int[] diffCurr = new int[m + 1];
            for (int j = 1; j <= m; j++) {
                if (s.charAt(i - 1) == t.charAt(j - 1)) {
                    // A matching pair of last characters carries the
                    // diagonal counts forward unchanged.
                    sameCurr[j] = samePrev[j - 1] + 1;
                    diffCurr[j] = diffPrev[j - 1];
                } else {
                    // This position is the single mismatch, so it can only
                    // extend back through a run that matched perfectly.
                    sameCurr[j] = 0;
                    diffCurr[j] = samePrev[j - 1] + 1;
                }
                total += diffCurr[j];
            }
            samePrev = sameCurr;
            diffPrev = diffCurr;
        }
        return (int) total;
    }
}
