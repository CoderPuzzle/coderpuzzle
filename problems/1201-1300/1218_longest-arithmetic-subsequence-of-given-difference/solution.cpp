class Solution {
  public:
    int longestSubsequence(vector<int> &arr, int difference) {
        // A fixed difference means each step must land on v + difference, so
        // the DP collapses from positions to a map keyed by ending value.
        unordered_map<int, int> dp;
        int best = 0;
        for (int x : arr) {
            // Best chain ending at x is one longer than the best ending at
            // x - difference (0 if no predecessor has appeared yet). The
            // lookup precedes the write, so only strictly-left elements are
            // used and the chain never runs backwards.
            auto it = dp.find(x - difference);
            int len = (it == dp.end() ? 0 : it->second) + 1;
            // Overwriting is safe: a later chain through the same value is
            // always at least as long as an earlier one.
            dp[x] = len;
            best = max(best, len);
        }
        return best;
    }
};
