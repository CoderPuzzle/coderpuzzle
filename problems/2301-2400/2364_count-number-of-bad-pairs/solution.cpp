class Solution {
  public:
    long long countBadPairs(vector<int> &nums) {
        // j - i != nums[j] - nums[i] rearranges to nums[j] - j !=
        // nums[i] - i: a pair is good exactly when the shifted values match.
        // Count good pairs per shifted value, subtract from all pairs; pair
        // counts reach ~5e9, so run the arithmetic in 64 bits.
        unordered_map<int, long long> counts;
        long long good = 0;
        for (int i = 0; i < static_cast<int>(nums.size()); ++i) {
            int shifted = nums[i] - i;
            auto found = counts.find(shifted);
            if (found != counts.end()) {
                good += found->second;
                ++found->second;
            } else {
                counts[shifted] = 1;
            }
        }
        long long n = static_cast<long long>(nums.size());
        return n * (n - 1) / 2 - good;
    }
};
