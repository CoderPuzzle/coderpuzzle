class Solution {
  public:
    long long minSumSquareDiff(vector<int> &nums1, vector<int> &nums2, int k1, int k2) {
        // Only |nums1[i] - nums2[i]| matters: a +1 on either array moves the
        // difference one step in whichever direction we pick, so k1 and k2
        // pool into one budget spent on absolute differences.
        const int n = static_cast<int>(nums1.size());
        int top = 0;
        for (int i = 0; i < n; ++i) {
            top = max(top, abs(nums1[i] - nums2[i]));
        }
        vector<long long> counts(static_cast<size_t>(top) + 1, 0);
        for (int i = 0; i < n; ++i) {
            ++counts[abs(nums1[i] - nums2[i])];
        }
        // Lowering an entry from v to v - 1 removes 2v - 1 from the sum,
        // more the larger v is, so a currently largest entry absorbs every
        // operation and none goes past zero (|d| would grow again). Sweep
        // levels downward, move whole buckets while the budget covers them,
        // split the bucket it does not cover. The budget widens before the
        // add (k1 + k2 overflows int) and each squared term widens before
        // the multiply (level * level reaches 10^10).
        long long budget = static_cast<long long>(k1) + k2;
        for (int level = top; level >= 1 && budget > 0; --level) {
            long long moved = min(counts[level], budget);
            if (moved == 0) {
                continue;
            }
            counts[level - 1] += moved;
            counts[level] -= moved;
            budget -= moved;
        }
        long long total = 0;
        for (int level = 0; level <= top; ++level) {
            total += static_cast<long long>(level) * level * counts[level];
        }
        return total;
    }
};
