class Solution {
  public:
    long long findMaximumScore(vector<int> &nums) {
        // The optimal first hop out of any position lands on the nearest
        // later index holding a strictly greater value: everything in
        // between is at most the current value, so any detour's legs earn
        // no more per unit of distance than staying put over the same
        // ground, while the leg beyond the swap gains the strictly larger
        // rate. When no greater value remains, jumping straight to the
        // last index is optimal by the same telescoping bound. Precompute
        // those nearest greater neighbors with a right-to-left monotonic
        // stack, then walk the chain.
        int n = nums.size();
        vector<int> jump(n, n - 1);
        vector<int> stk;
        for (int i = n - 1; i >= 0; i--) {
            while (!stk.empty() && nums[stk.back()] <= nums[i]) {
                stk.pop_back();
            }
            if (!stk.empty()) {
                jump[i] = stk.back();
            }
            stk.push_back(i);
        }
        long long score = 0;
        int pos = 0;
        while (pos < n - 1) {
            score += static_cast<long long>(jump[pos] - pos) * nums[pos];
            pos = jump[pos];
        }
        return score;
    }
};
