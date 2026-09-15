class Solution {

    // Counting sort: tally each price, then sweep prices from cheapest.
    // Buying cheapest-first is optimal, and the tally makes that walk
    // O(max_price) instead of O(n log n).
    public int maxIceCream(int[] costs, int coins) {
        int[] count = new int[100001];
        for (int c : costs) {
            count[c]++;
        }
        int bought = 0;
        long budget = coins;
        for (int price = 1; price <= 100000; price++) {
            if (count[price] == 0 || price > budget) {
                continue;
            }
            long afford = Math.min(count[price], budget / price);
            bought += afford;
            budget -= afford * price;
            if (budget == 0) {
                break;
            }
        }
        return bought;
    }
}
