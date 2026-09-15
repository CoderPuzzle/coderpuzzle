class Solution {
  public:
    int maxOperations(vector<int> &nums) {
        int n = nums.size();
        int candidates[3] = {nums[0] + nums[1], nums[n - 1] + nums[n - 2], nums[0] + nums[n - 1]};
        int best = 0;
        for (int score : candidates) {
            best = max(best, maxForScore(nums, score));
        }
        return best;
    }

  private:
    // dp[l][r] = max deletions inside nums[l..r] achieving `score`
    int maxForScore(vector<int> &nums, int score) {
        int n = nums.size();
        vector<vector<int>> dp(n, vector<int>(n, 0));
        for (int length = 2; length <= n; length++) {
            for (int l = 0; l + length <= n; l++) {
                int r = l + length - 1;
                int best = 0;
                if (nums[l] + nums[l + 1] == score) {
                    int sub = (l + 2 <= r) ? dp[l + 2][r] : 0;
                    best = max(best, 1 + sub);
                }
                if (nums[r] + nums[r - 1] == score) {
                    int sub = (l + 2 <= r) ? dp[l][r - 2] : 0;
                    best = max(best, 1 + sub);
                }
                if (nums[l] + nums[r] == score) {
                    int sub = (l + 2 <= r) ? dp[l + 1][r - 1] : 0;
                    best = max(best, 1 + sub);
                }
                dp[l][r] = best;
            }
        }
        return dp[0][n - 1];
    }
};
