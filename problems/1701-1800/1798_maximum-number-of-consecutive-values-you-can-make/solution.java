import java.util.Arrays;

class Solution {

    public int getMaximumConsecutive(int[] coins) {
        int[] sorted = coins.clone();
        Arrays.sort(sorted);
        // Invariant: every value in [0, reachable] is makeable as a subset sum.
        int reachable = 0;
        for (int coin : sorted) {
            if (coin > reachable + 1) {
                // Gap at reachable + 1; later coins are larger, so it can never be closed.
                break;
            }
            // Cheapest coin extends the contiguous range to reachable + coin.
            reachable += coin;
        }
        // Count of consecutive makeable values 0..reachable.
        return reachable + 1;
    }
}
