class Solution {
  public:
    int alternatingSum(vector<int> &nums) {
        // Even indices add, odd indices subtract: walk the array two
        // positions at a time, adding each even-index element and
        // subtracting the odd-index partner that follows it. A trailing
        // element at the last even index has no partner to subtract.
        int n = static_cast<int>(nums.size());
        int total = 0;
        for (int i = 0; i < n; i += 2) {
            total += nums[i];
            if (i + 1 < n) {
                total -= nums[i + 1];
            }
        }
        return total;
    }
};
