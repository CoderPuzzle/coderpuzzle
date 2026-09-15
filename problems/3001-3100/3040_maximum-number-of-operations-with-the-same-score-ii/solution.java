class Solution {

    public int maxOperations(int[] nums) {
        int n = nums.length;
        int[] candidates = { nums[0] + nums[1], nums[n - 1] + nums[n - 2], nums[0] + nums[n - 1] };
        int best = 0;
        for (int score : candidates) {
            best = Math.max(best, maxForScore(nums, score));
        }
        return best;
    }

    // dp[l][r] = max deletions inside nums[l..r] achieving `score`
    private int maxForScore(int[] nums, int score) {
        int n = nums.length;
        int[][] dp = new int[n][n];
        for (int length = 2; length <= n; length++) {
            for (int l = 0; l + length <= n; l++) {
                int r = l + length - 1;
                int best = 0;
                if (nums[l] + nums[l + 1] == score) {
                    best = Math.max(best, 1 + (l + 2 <= r ? dp[l + 2][r] : 0));
                }
                if (nums[r] + nums[r - 1] == score) {
                    best = Math.max(best, 1 + (l + 2 <= r ? dp[l][r - 2] : 0));
                }
                if (nums[l] + nums[r] == score) {
                    best = Math.max(best, 1 + (l + 2 <= r ? dp[l + 1][r - 1] : 0));
                }
                dp[l][r] = best;
            }
        }
        return dp[0][n - 1];
    }
}
