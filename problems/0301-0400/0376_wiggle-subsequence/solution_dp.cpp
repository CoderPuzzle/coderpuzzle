class Solution {
  public:
    int wiggleMaxLength(vector<int> &nums) {
        // An alternating subsequence is always in one of two states: its
        // last step rose, or its last step fell. Keep the best length
        // reached in each state; a rise extends the opposite state, a fall
        // extends the rising one, and equal neighbors extend nothing.
        int n = (int)nums.size();
        // up[i]: best within the first i + 1 elements ending on a rise;
        // down[i]: the symmetric best ending on a fall.
        vector<int> up(n, 1), down(n, 1);
        for (int i = 1; i < n; ++i) {
            if (nums[i] > nums[i - 1]) {
                up[i] = down[i - 1] + 1;
                down[i] = down[i - 1];
            } else if (nums[i] < nums[i - 1]) {
                down[i] = up[i - 1] + 1;
                up[i] = up[i - 1];
            } else {
                up[i] = up[i - 1];
                down[i] = down[i - 1];
            }
        }
        return max(up[n - 1], down[n - 1]);
    }
};
