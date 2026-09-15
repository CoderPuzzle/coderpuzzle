class Solution {
  public:
    int longestBalanced(vector<int> &nums) {
        int n = nums.size(), best = 0;
        // Fix the left endpoint and stretch the right one; the two sets hold
        // the distinct even and odd values of the current window, so equal
        // sizes mean the window is balanced.
        for (int left = 0; left < n; left++) {
            unordered_set<int> evens, odds;
            for (int right = left; right < n; right++) {
                if (nums[right] % 2 == 0) {
                    evens.insert(nums[right]);
                } else {
                    odds.insert(nums[right]);
                }
                if (evens.size() == odds.size()) {
                    best = max(best, right - left + 1);
                }
            }
        }
        // No window ever balanced leaves best at 0.
        return best;
    }
};
