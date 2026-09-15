class Solution {

    public long getDescentPeriods(int[] prices) {
        long run = 1;
        long total = 1;
        for (int index = 1; index < prices.length; index++) {
            run = prices[index - 1] - prices[index] == 1 ? run + 1 : 1;
            total += run;
        }
        return total;
    }
}
