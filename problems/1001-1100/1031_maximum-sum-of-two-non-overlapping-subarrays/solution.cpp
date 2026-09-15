class Solution {
  public:
    int maxSumTwoNoOverlap(vector<int> &nums, int firstLen, int secondLen) {
        int n = static_cast<int>(nums.size());
        vector<int> prefix(n + 1, 0);
        for (int i = 0; i < n; ++i) {
            prefix[i + 1] = prefix[i] + nums[i];
        }

        // Try both relative orders: firstLen before secondLen, and
        // secondLen before firstLen. Skipping either one silently misses
        // inputs where the better placement runs the other way.
        return max(best(prefix, n, firstLen, secondLen), best(prefix, n, secondLen, firstLen));
    }

  private:
    int best(const vector<int> &prefix, int n, int lead, int trail) {
        // Sweep every position where the trailing window could end,
        // tracking the best leading window that ends at or before the
        // trailing window's start (so the two never overlap, whether they
        // touch or leave a gap between them).
        int maxLead = 0;
        int result = 0;
        for (int end = lead + trail; end <= n; ++end) {
            int leadSum = prefix[end - trail] - prefix[end - trail - lead];
            maxLead = max(maxLead, leadSum);
            int trailSum = prefix[end] - prefix[end - trail];
            result = max(result, maxLead + trailSum);
        }
        return result;
    }
};
