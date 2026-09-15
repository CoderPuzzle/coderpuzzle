class Solution {
  public:
    long long countAlternatingSubarrays(vector<int> &nums) {
        // The answer reaches n * (n + 1) / 2 = 5,000,050,000 at the
        // bounds, past what an int can hold, so accumulate in 64-bit.
        long long count = 0;
        long long current = 0;
        for (int index = 0; index < static_cast<int>(nums.size()); index++) {
            if (index > 0 && nums[index] == nums[index - 1]) {
                current = 1;
            } else {
                ++current;
            }
            count += current;
        }
        return count;
    }
};
