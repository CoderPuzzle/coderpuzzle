class Solution {

    public int maxCompatibilitySum(int[][] students, int[][] mentors) {
        int m = students.length;
        // Precompute the m x m agreement counts so the DP touches only ints.
        int[][] score = new int[m][m];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < m; j++) {
                int s = 0;
                for (int t = 0; t < students[i].length; t++) {
                    if (students[i][t] == mentors[j][t]) s++;
                }
                score[i][j] = s;
            }
        }
        int full = 1 << m;
        // dp[mask] = best total score matching the first popcount(mask)
        // students to exactly the mentors in mask; dp[0] = 0. The used-mentor
        // count alone pins down which student is placed next. Increasing
        // numeric order works because every submask is numerically smaller.
        int[] dp = new int[full];
        for (int mask = 1; mask < full; mask++) {
            int i = Integer.bitCount(mask) - 1;
            int best = 0;
            for (int j = 0; j < m; j++) {
                if (((mask >> j) & 1) != 0) {
                    // Mentor j was this student's match: extend the
                    // assignment without j by their pairwise score.
                    int v = dp[mask ^ (1 << j)] + score[i][j];
                    if (v > best) best = v;
                }
            }
            dp[mask] = best;
        }
        return dp[full - 1];
    }
}
