class Solution {

    public int maximumProfit(int[] present, int[] future, int budget) {
        int[] dp = new int[budget + 1];
        for (int i = 0; i < present.length; i++) {
            int price = present[i];
            int gain = future[i] - price;
            if (gain <= 0) {
                continue;
            }
            for (int money = budget; money >= price; money--) {
                dp[money] = Math.max(dp[money], dp[money - price] + gain);
            }
        }
        return dp[budget];
    }
}
