class Solution {
  public:
    // E[x][d]: longest subsequence over processed prefixes ending with
    // value x, whose last adjacent difference is >= d (suffix max over d).
    int longestSubsequence(vector<int> &nums) {
        const int maxV = 300;
        vector<vector<int>> E(maxV + 1, vector<int>(maxV, 0));
        int ans = 1;
        for (int v : nums) {
            // Exact-difference lengths ending here: a predecessor with new
            // difference d must sit at value v-d or v+d, and its own last
            // difference must be >= d — exactly what E[..][d] stores.
            vector<int> &row = E[v];
            vector<int> lens(maxV);
            for (int d = 0; d < maxV; d++) {
                int cand = v - d >= 1 ? E[v - d][d] : 0;
                if (v + d <= maxV && E[v + d][d] > cand) {
                    cand = E[v + d][d];
                }
                lens[d] = cand + 1;
            }
            // Merge the suffix max of those lengths back into row v; lens
            // entries are already >= 1, covering the singleton [v].
            int run = 0;
            for (int d = maxV - 1; d >= 0; d--) {
                run = max(run, lens[d]);
                row[d] = max(row[d], run);
            }
            ans = max(ans, row[0]);
        }
        return ans;
    }
};
