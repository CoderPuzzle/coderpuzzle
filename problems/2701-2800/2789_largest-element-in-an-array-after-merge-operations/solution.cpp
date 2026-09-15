class Solution {
  public:
    long long maxArrayValue(vector<int> &nums) {
        int n = nums.size();
        long long pile = nums[n - 1];
        long long best = pile;
        for (int i = n - 2; i >= 0; --i) {
            if (pile >= nums[i]) {
                pile += nums[i];
            } else {
                pile = nums[i];
            }
            best = max(best, pile);
        }
        return best;
    }
};
