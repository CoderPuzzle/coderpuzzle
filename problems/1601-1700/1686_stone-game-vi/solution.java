import java.util.Arrays;

class Solution {

    public int stoneGameVI(int[] aliceValues, int[] bobValues) {
        int n = aliceValues.length;
        // Taking a stone gains your value AND denies the opponent theirs, so
        // both players effectively compete for aliceValues[i] + bobValues[i].
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; i++) {
            order[i] = i;
        }
        Arrays.sort(order, (i, j) -> aliceValues[j] + bobValues[j] - (aliceValues[i] + bobValues[i]));
        long diff = 0;
        for (int rank = 0; rank < n; rank++) {
            int i = order[rank];
            if (rank % 2 == 0) {
                diff += aliceValues[i]; // Alice picks ranks 0, 2, 4, ...
            } else {
                diff -= bobValues[i]; // Bob picks ranks 1, 3, 5, ...
            }
        }
        return diff > 0 ? 1 : diff < 0 ? -1 : 0;
    }
}
