import java.util.Arrays;

class Solution {

    public double minPrice(int[] prices, int[] discounts) {
        // Sort both descending and pair positionally: by the exchange
        // argument, largest discount on largest price maximizes p*d/100.
        Arrays.sort(prices);
        Arrays.sort(discounts);
        long saved = 0;
        int pairs = Math.min(prices.length, discounts.length);
        for (int i = 0; i < pairs; ++i) {
            saved += (long) prices[prices.length - 1 - i] * discounts[discounts.length - 1 - i];
        }
        long total = 0;
        for (int price : prices) {
            total += price;
        }
        // The product sum reaches 1e12 in the long; dividing once yields
        // the correctly rounded double of the rational total.
        return (total * 100L - saved) / 100.0;
    }
}
