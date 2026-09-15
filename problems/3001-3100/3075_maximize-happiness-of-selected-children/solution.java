import java.util.Arrays;

class Solution {

    public long maximumHappinessSum(int[] happiness, int k) {
        // Every unselected child loses 1 per turn, so the child picked
        // in turn i (0-based) contributes its original value minus i,
        // floored at 0. Values only shrink while waiting, so taking the
        // largest available each turn is optimal. Widen to long before
        // accumulating: the total reaches 2e5 * 1e8 = 2e13, far past int.
        Arrays.sort(happiness);
        long total = 0;
        for (int i = 0; i < k; i++) {
            long value = (long) happiness[happiness.length - 1 - i] - i;
            if (value > 0) {
                total += value;
            }
        }
        return total;
    }
}
