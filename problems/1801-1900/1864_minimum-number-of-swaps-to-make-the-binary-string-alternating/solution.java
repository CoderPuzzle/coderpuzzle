class Solution {

    // Only the two canonical alternating patterns are targets. Each swap
    // fixes exactly two mismatched positions, so a pattern costs mismatches
    // divided by two; take the cheaper count-feasible pattern.
    public int minSwaps(String s) {
        int ones = 0;
        int n = s.length();
        for (int i = 0; i < n; i++) {
            ones += s.charAt(i) - '0';
        }
        if (Math.abs(2 * ones - n) > 1) {
            return -1;
        }
        int best = -1;
        for (int start = 0; start <= 1; start++) {
            int patternOnes = start == 0 ? (n + 1) / 2 : n / 2;
            if (patternOnes != ones) {
                continue;
            }
            int mism = 0;
            for (int i = 0; i < n; i++) {
                if (s.charAt(i) != (char) ('0' + ((i & 1) ^ start ^ 1))) {
                    mism++;
                }
            }
            int cost = mism / 2;
            if (best < 0 || cost < best) {
                best = cost;
            }
        }
        return best;
    }
}
