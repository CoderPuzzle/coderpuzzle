class Solution {
  public:
    vector<int> maximumLengthOfRanges(vector<int> &nums) {
        int n = nums.size();
        vector<int> left(n); // nearest index with a greater element on the left, +1
        vector<int> stack;
        for (int i = 0; i < n; i++) {
            while (!stack.empty() && nums[stack.back()] < nums[i])
                stack.pop_back();
            left[i] = stack.empty() ? 0 : stack.back() + 1;
            stack.push_back(i);
        }
        vector<int> right(n); // nearest index with a greater element on the right, -1
        stack.clear();
        for (int i = n - 1; i >= 0; i--) {
            while (!stack.empty() && nums[stack.back()] < nums[i])
                stack.pop_back();
            right[i] = stack.empty() ? n - 1 : stack.back() - 1;
            stack.push_back(i);
        }
        vector<int> result(n);
        for (int i = 0; i < n; i++)
            result[i] = right[i] - left[i] + 1;
        return result;
    }
};
