class Solution {
  public:
    int findLength(vector<int> &nums1, vector<int> &nums2) {
        int m = nums1.size(), n = nums2.size();
        // dp[j] = longest common run starting exactly at nums1[i+1], nums2[j];
        // sweeping i downward keeps row i+1 available when row i is computed.
        vector<int> dp(n + 1, 0);
        int best = 0;
        for (int i = m - 1; i >= 0; i--) {
            vector<int> cur(n + 1, 0);
            for (int j = n - 1; j >= 0; j--) {
                if (nums1[i] == nums2[j]) {
                    // Match extends the run starting at (i+1, j+1); a mismatch
                    // leaves 0 — no shared subarray starts there.
                    cur[j] = dp[j + 1] + 1;
                    if (cur[j] > best)
                        best = cur[j];
                }
            }
            // Roll: only the previous row is ever read.
            dp = move(cur);
        }
        return best;
    }
};
