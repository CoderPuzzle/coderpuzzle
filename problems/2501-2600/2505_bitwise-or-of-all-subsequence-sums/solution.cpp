class Solution {
  public:
    long long subsequenceSumOr(std::vector<int> &nums) {
        // Each element and each running prefix is itself a subsequence sum,
        // and together they carry every bit the full OR can raise, so one
        // pass folds both into the answer. Prefixes reach 10^5 * 10^9 =
        // 10^14, beyond int range, hence the 64-bit accumulators.
        long long ans = 0;
        long long pre = 0;
        for (int x : nums) {
            pre += x;
            ans |= x | pre;
        }
        return ans;
    }
};
