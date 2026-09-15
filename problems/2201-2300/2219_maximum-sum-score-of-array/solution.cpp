class Solution {
  public:
    long long maximumSumScore(vector<int> &nums) {
        // The suffix at i is total minus the prefix before it, so one
        // running total plus the array total covers every index in a single
        // pass.
        long long total = accumulate(nums.begin(), nums.end(), 0LL);
        long long prefix = 0;
        long long best = numeric_limits<long long>::min();
        for (int value : nums) {
            prefix += value;
            best = max(best, max(prefix, total - prefix + value));
        }
        return best;
    }
};
