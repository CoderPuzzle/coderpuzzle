class Solution {
  public:
    long long minArraySum(vector<int> &nums, int k) {
        // A block sums to a multiple of k exactly when its endpoint prefix
        // sums share a remainder mod k, and any deletion sequence collapses
        // to disjoint divisible-sum blocks of the original array.
        unordered_map<int, long long> best;
        best.reserve(nums.size() + 1);
        best[0] = 0;
        // dp: min surviving sum over the elements processed so far. Totals
        // reach 1e11, hence long long throughout.
        long long dp = 0, prefix = 0;
        for (int value : nums) {
            // Keep this element...
            long long cand = dp + value;
            prefix += value;
            // ...or delete back to the nearest same-remainder prefix, which
            // leaves that prefix's surviving sum untouched.
            auto it = best.find(static_cast<int>(prefix % k));
            if (it != best.end() && it->second < cand) {
                cand = it->second;
            }
            dp = cand;
            // Insert after the lookup so the empty block never registers.
            int r = static_cast<int>(prefix % k);
            it = best.find(r);
            if (it == best.end()) {
                best.emplace(r, dp);
            } else if (dp < it->second) {
                it->second = dp;
            }
        }
        return dp;
    }
};
