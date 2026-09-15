import java.util.Arrays;

class Solution {

    public int maxSatisfaction(int[] satisfaction) {
        // Sort ascending; the chosen set is a suffix of this order. Adding
        // a new value at the front shifts every chosen dish one slot later
        // (gaining runningSum) and contributes value * 1 for its own slot,
        // so the net change is value + runningSum.
        Arrays.sort(satisfaction);
        int total = 0;
        int runningSum = 0;
        for (int i = satisfaction.length - 1; i >= 0; i--) {
            if (runningSum + satisfaction[i] > 0) {
                runningSum += satisfaction[i];
                total += runningSum;
            }
        }
        return total;
    }
}
