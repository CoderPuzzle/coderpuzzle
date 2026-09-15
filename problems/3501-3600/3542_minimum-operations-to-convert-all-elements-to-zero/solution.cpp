class Solution {
  public:
    int minOperations(vector<int> &nums) {
        // Monotonic stack of the minima of currently open windows. An
        // element equal to the top continues that window's group (same
        // operation), a larger element opens a new group (one more
        // operation), and anything smaller — including 0 — closes every
        // window above it.
        int ans = 0;
        vector<int> stack;
        for (int x : nums) {
            while (!stack.empty() && stack.back() > x)
                stack.pop_back();
            if (x > 0 && (stack.empty() || stack.back() < x)) {
                ++ans;
                stack.push_back(x);
            }
        }
        return ans;
    }
};
