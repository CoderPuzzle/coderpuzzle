class Solution {
  public:
    bool find132pattern(vector<int> &nums) {
        if (nums.size() < 3) {
            return false;
        }
        vector<int> stack;
        // Scan right-to-left; `third` is the largest value known to sit
        // after something bigger — the best nums[k] candidate (MIN = none
        // yet).
        long long third = LLONG_MIN;
        for (int i = (int)nums.size() - 1; i >= 0; i--) {
            int value = nums[i];
            // Current value below third makes it a valid nums[i]; the pair
            // that produced third lies entirely to its right.
            if (value < third) {
                return true;
            }
            // Popped values are smaller than `value` and lie to its right,
            // so each has a larger number before it; the last (largest)
            // popped becomes third. The stack stays decreasing.
            while (!stack.empty() && stack.back() < value) {
                third = stack.back();
                stack.pop_back();
            }
            stack.push_back(value);
        }
        return false;
    }
};
