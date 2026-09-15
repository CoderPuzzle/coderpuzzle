class Solution {
  public:
    int validSubarraySize(vector<int> &nums, int threshold) {
        int n = (int)nums.size();
        // next_le[i] = nearest index j > i with nums[j] <= nums[i]
        vector<int> nextLe(n);
        vector<int> stack;
        stack.reserve(n);
        for (int i = n - 1; i >= 0; i--) {
            while (!stack.empty() && nums[stack.back()] > nums[i]) {
                stack.pop_back();
            }
            nextLe[i] = stack.empty() ? n : stack.back();
            stack.push_back(i);
        }

        // prev_lt[i] = nearest index j < i with nums[j] < nums[i]
        vector<int> prevLt(n);
        stack.clear();
        for (int i = 0; i < n; i++) {
            while (!stack.empty() && nums[stack.back()] >= nums[i]) {
                stack.pop_back();
            }
            prevLt[i] = stack.empty() ? -1 : stack.back();
            stack.push_back(i);
        }

        int best = -1;
        for (int i = 0; i < n; i++) {
            int span = nextLe[i] - prevLt[i] - 1;
            int k = threshold / nums[i] + 1;
            if (k <= span && (best == -1 || k < best)) {
                best = k;
            }
        }
        return best;
    }
};
