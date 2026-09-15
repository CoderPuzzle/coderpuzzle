class Solution {
  public:
    bool isMonotonic(vector<int> &nums) {
        // Two hypotheses survive until refuted: a rise kills the decreasing
        // one, a drop kills the increasing one, equals keep both standing.
        bool increasing = true;
        bool decreasing = true;
        int n = nums.size();
        for (int i = 1; i < n; i++) {
            if (nums[i] > nums[i - 1]) {
                decreasing = false;
            } else if (nums[i] < nums[i - 1]) {
                increasing = false;
            }
        }
        return increasing || decreasing;
    }
};
