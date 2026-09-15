class Solution {
  public:
    int maximizeExpressionOfThree(vector<int> &nums) {
        // The best assignment inside any picked triple puts its two largest
        // values in the a and b slots and its smallest in the c slot, so the
        // optimum is the array's two largest values minus its smallest.
        int top = max(nums[0], nums[1]);
        int runner_up = min(nums[0], nums[1]);
        int low = runner_up;
        // Fold in every later element (n >= 3): below the minimum replaces
        // it, above the top pushes the old top down to runner-up, anything
        // else that beats the runner-up takes its seat.
        for (int i = 2; i < (int)nums.size(); ++i) {
            int num = nums[i];
            if (num < low) {
                low = num;
            }
            if (num > top) {
                runner_up = top;
                top = num;
            } else if (num > runner_up) {
                runner_up = num;
            }
        }
        return top + runner_up - low;
    }
};
