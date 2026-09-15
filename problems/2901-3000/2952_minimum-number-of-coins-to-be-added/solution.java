import java.util.Arrays;

class Solution {

    public int minimumAddedCoins(int[] coins, int target) {
        Arrays.sort(coins);
        long reach = 0; // every value in [1, reach] is obtainable
        int added = 0;
        int i = 0;
        while (reach < target) {
            if (i < coins.length && coins[i] <= reach + 1) {
                reach += coins[i];
                i++;
            } else {
                // must add the coin worth reach + 1
                reach += reach + 1;
                added++;
            }
        }
        return added;
    }
}
