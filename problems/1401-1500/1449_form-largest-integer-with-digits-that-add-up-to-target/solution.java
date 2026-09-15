class Solution {

    public String largestNumber(int[] cost, int target) {
        int[] dp = new int[target + 1];
        for (int t = 1; t <= target; t++) {
            dp[t] = -1;
        }
        for (int t = 1; t <= target; t++) {
            for (int c : cost) {
                if (c <= t && dp[t - c] != -1 && dp[t - c] + 1 > dp[t]) {
                    dp[t] = dp[t - c] + 1;
                }
            }
        }
        if (dp[target] == -1) {
            return "0";
        }
        StringBuilder result = new StringBuilder();
        int remaining = target;
        while (remaining > 0) {
            for (int digit = 9; digit >= 1; digit--) {
                int c = cost[digit - 1];
                if (c <= remaining && dp[remaining - c] == dp[remaining] - 1) {
                    result.append(digit);
                    remaining -= c;
                    break;
                }
            }
        }
        return result.toString();
    }
}
