class Solution {
  public:
    int maxWidthRamp(vector<int> &nums) {
        // Monotonic stack of record lows: an index matters as a left end
        // only when no earlier index holds a smaller value.
        vector<int> stack;
        for (int i = 0; i < (int)nums.size(); i++) {
            if (stack.empty() || nums[stack.back()] > nums[i]) {
                stack.push_back(i);
            }
        }
        // Right-to-left: the first (largest) j that dominates a stack top
        // pops it at that top's widest possible width.
        int best = 0;
        for (int j = (int)nums.size() - 1; j >= 0; j--) {
            while (!stack.empty() && nums[stack.back()] <= nums[j]) {
                best = max(best, j - stack.back());
                stack.pop_back();
            }
        }
        return best;
    }
};
