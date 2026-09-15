class Solution {

    public long minimumMoney(int[][] transactions) {
        long totalLose = 0;
        long maxCashbackLosing = 0;
        long maxCostWinning = 0;
        for (int[] t : transactions) {
            long cost = t[0],
                cashback = t[1];
            // losers (cashback < cost) drain money permanently; winners don't
            if (cashback < cost) {
                // losers' total drain is fixed regardless of ordering
                totalLose += cost - cashback;
                // worst order: largest-cashback loser goes last, after every
                // other drain, yet its full cost must still be covered
                if (cashback > maxCashbackLosing) maxCashbackLosing = cashback;
            } else {
                // winners only matter via their largest upfront cost, paid at
                // the lowest-funds point (right after the losing block)
                if (cost > maxCostWinning) maxCostWinning = cost;
            }
        }
        // answer = totalLose + max(last loser's cashback, top winner's cost)
        return totalLose + Math.max(maxCashbackLosing, maxCostWinning);
    }
}
