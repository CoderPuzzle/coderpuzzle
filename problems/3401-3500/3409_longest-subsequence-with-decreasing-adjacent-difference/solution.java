class Solution {

    // E[x][d]: longest subsequence over processed prefixes ending with
    // value x, whose last adjacent difference is >= d (suffix max over d).
    public int longestSubsequence(int[] nums) {
        final int maxV = 300;
        int[][] E = new int[maxV + 1][maxV];
        int ans = 1;
        for (int v : nums) {
            // Exact-difference lengths ending here: a predecessor with new
            // difference d must sit at value v-d or v+d, and its own last
            // difference must be >= d — exactly what E[..][d] stores.
            int[] lens = new int[maxV];
            for (int d = 0; d < maxV; d++) {
                int cand = v - d >= 1 ? E[v - d][d] : 0;
                if (v + d <= maxV && E[v + d][d] > cand) {
                    cand = E[v + d][d];
                }
                lens[d] = cand + 1;
            }
            // Merge the suffix max of those lengths back into row v; lens
            // entries are already >= 1, covering the singleton [v].
            int[] row = E[v];
            int run = 0;
            for (int d = maxV - 1; d >= 0; d--) {
                if (lens[d] > run) {
                    run = lens[d];
                }
                if (run > row[d]) {
                    row[d] = run;
                }
            }
            if (row[0] > ans) {
                ans = row[0];
            }
        }
        return ans;
    }
}
