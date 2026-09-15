class Solution {
  public:
    bool predictTheWinner(vector<int> &nums) {
        int n = nums.size();
        // dp[i] = best (mover's score - opponent's score) on the window
        // ending at j; the copy of nums is the length-1 base case.
        vector<long long> dp(nums.begin(), nums.end());
        for (int length = 2; length <= n; length++) {
            for (int i = 0; i + length - 1 < n; i++) {
                int j = i + length - 1;
                // Take an end, bank it, and absorb the opponent's optimal
                // reply as a subtracted sub-difference. In place, dp[i] is
                // still window (i, j-1) and dp[i+1] is (i+1, j) — the two
                // shorter intervals the recurrence needs.
                dp[i] = max((long long)nums[i] - dp[i + 1], (long long)nums[j] - dp[i]);
            }
        }
        // Player 1 moves first on the whole array; ties count as a win.
        return dp[0] >= 0;
    }
};
