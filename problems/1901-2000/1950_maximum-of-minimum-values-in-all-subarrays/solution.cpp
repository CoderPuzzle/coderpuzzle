class Solution {
  public:
    vector<int> findMaximums(vector<int> &nums) {
        int n = nums.size();
        vector<int> left(n), right(n);
        // Nearest strictly smaller element on each side. Popping on >= (not
        // just >) deliberately splits spans at equal values so every
        // duplicate owns the sub-window where it is the minimum.
        vector<int> stack;
        for (int i = 0; i < n; i++) {
            while (!stack.empty() && nums[stack.back()] >= nums[i]) {
                stack.pop_back();
            }
            left[i] = stack.empty() ? -1 : stack.back();
            stack.push_back(i);
        }
        stack.clear();
        for (int i = n - 1; i >= 0; i--) {
            while (!stack.empty() && nums[stack.back()] >= nums[i]) {
                stack.pop_back();
            }
            right[i] = stack.empty() ? n : stack.back();
            stack.push_back(i);
        }
        vector<int> ans(n, 0);
        for (int i = 0; i < n; i++) {
            // nums[i] is the minimum of any window within its maximal span,
            // so it seeds that length (max wins when spans collide).
            int length = right[i] - left[i] - 1;
            if (nums[i] > ans[length - 1]) {
                ans[length - 1] = nums[i];
            }
        }
        // Seeding covers only maximal spans: a size-(k+1) window contains a
        // size-k sub-window with a no-smaller minimum, so answers are
        // monotone and this suffix max repairs every shorter length with the
        // best longer-span guarantee.
        for (int i = n - 2; i >= 0; i--) {
            if (ans[i + 1] > ans[i]) {
                ans[i] = ans[i + 1];
            }
        }
        return ans;
    }
};
