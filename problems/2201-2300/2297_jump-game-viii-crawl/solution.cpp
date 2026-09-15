class Solution {
  public:
    long long minCost(vector<int> &nums, vector<int> &costs) {
        int n = static_cast<int>(nums.size());
        vector<int> next_ge(n, -1);
        vector<int> next_lt(n, -1);
        vector<int> greater_stack;
        vector<int> lower_stack;
        for (int index = n - 1; index >= 0; --index) {
            while (!greater_stack.empty() && nums[greater_stack.back()] < nums[index]) {
                greater_stack.pop_back();
            }
            if (!greater_stack.empty())
                next_ge[index] = greater_stack.back();
            greater_stack.push_back(index);
            while (!lower_stack.empty() && nums[lower_stack.back()] >= nums[index]) {
                lower_stack.pop_back();
            }
            if (!lower_stack.empty())
                next_lt[index] = lower_stack.back();
            lower_stack.push_back(index);
        }
        vector<long long> best(n, 1LL << 62);
        best[0] = 0;
        for (int index = 0; index < n; ++index) {
            for (int target : {next_ge[index], next_lt[index]}) {
                if (target != -1 && best[index] + costs[target] < best[target]) {
                    best[target] = best[index] + costs[target];
                }
            }
        }
        return best[n - 1];
    }
};
