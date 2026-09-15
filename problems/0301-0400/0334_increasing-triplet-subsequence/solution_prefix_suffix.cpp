class Solution {
  public:
    bool increasingTriplet(vector<int> &nums) {
        int n = nums.size();
        if (n < 3) {
            return false;
        }
        // leftMin[j]: smallest value strictly before j; rightMax[j]:
        // largest value strictly after j. The sentinel ends can never
        // satisfy the check, so every position tests uniformly.
        vector<long long> leftMin(n, (1LL << 62));
        vector<long long> rightMax(n, -(1LL << 62));
        for (int j = 1; j < n; ++j) {
            leftMin[j] = min(leftMin[j - 1], (long long)nums[j - 1]);
        }
        for (int j = n - 2; j >= 0; --j) {
            rightMax[j] = max(rightMax[j + 1], (long long)nums[j + 1]);
        }
        for (int j = 0; j < n; ++j) {
            if (leftMin[j] < nums[j] && nums[j] < rightMax[j]) {
                return true;
            }
        }
        return false;
    }
};
