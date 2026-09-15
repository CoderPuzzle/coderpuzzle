class Solution {
  public:
    int minSwaps(vector<int> &nums) {
        int n = nums.size();
        int ones = accumulate(nums.begin(), nums.end(), 0);
        int windowOnes = accumulate(nums.begin(), nums.begin() + ones, 0);
        int best = windowOnes;
        for (int start = 1; start < n; ++start) {
            windowOnes -= nums[start - 1];
            windowOnes += nums[(start + ones - 1) % n];
            best = max(best, windowOnes);
        }
        return ones - best;
    }
};
