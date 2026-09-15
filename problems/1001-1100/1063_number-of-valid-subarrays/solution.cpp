class Solution {
  public:
    long long validSubarrays(vector<int> &nums) {
        int n = nums.size();
        long long total = 0;
        vector<int> stack;
        stack.reserve(n + 1);
        for (int i = 0; i <= n; i++) {
            int current = i == n ? -1 : nums[i];
            while (!stack.empty() && nums[stack.back()] > current) {
                int j = stack.back();
                stack.pop_back();
                total += i - j;
            }
            stack.push_back(i);
        }
        return total;
    }
};
