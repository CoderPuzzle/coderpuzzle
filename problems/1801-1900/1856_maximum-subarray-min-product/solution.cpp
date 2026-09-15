class Solution {
  public:
    int maxSumMinProduct(vector<int> &nums) {
        const long long MOD = 1000000007LL;
        int n = (int)nums.size();
        vector<long long> prefix(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        long long best = 0;
        vector<int> stack; // indices with strictly increasing values
        stack.reserve(n);
        for (int i = 0; i <= n; i++) {
            long long cur = i < n ? nums[i] : 0; // sentinel 0 pops everything
            while (!stack.empty() && nums[stack.back()] >= cur) {
                long long m = nums[stack.back()];
                stack.pop_back();
                int left = stack.empty() ? -1 : stack.back();
                long long total = prefix[i] - prefix[left + 1];
                best = max(best, m * total);
            }
            if (i < n) {
                stack.push_back(i);
            }
        }
        return (int)(best % MOD);
    }
};
