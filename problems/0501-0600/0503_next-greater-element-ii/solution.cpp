class Solution {
  public:
    vector<int> nextGreaterElements(vector<int> &nums) {
        int n = nums.size();
        vector<int> result(n, -1);
        vector<int> stack;
        // One extra lap simulates the wrap-around without copying the
        // array; the resolver of any waiting index lies within one cycle
        // ahead.
        for (int i = 0; i < 2 * n; i++) {
            int idx = i % n;
            // The stack holds indices with non-increasing values; the
            // current circular value is the first strictly greater one
            // ahead of each popped index (equal values are not popped).
            while (!stack.empty() && nums[stack.back()] < nums[idx]) {
                result[stack.back()] = nums[idx];
                stack.pop_back();
            }
            // Push only during the first lap; the second just resolves.
            if (i < n) {
                stack.push_back(idx);
            }
        }
        return result;
    }
};
