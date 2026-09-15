import java.util.Arrays;

class Solution {

    public long minimumRemoval(int[] beans) {
        // In a sorted layout, keeping bags equal to the value at index i
        // means: remove everything before i entirely, and trim every later
        // bag down to that value. Totals reach 10^10, so long carries them.
        long total = 0;
        for (int bean : beans) {
            total += bean;
        }
        int[] ordered = beans.clone();
        Arrays.sort(ordered);
        long best = total; // keep nothing (degenerate floor)
        int n = ordered.length;
        for (int index = 0; index < n; ++index) {
            long keptTotal = (long) ordered[index] * (n - index);
            best = Math.min(best, total - keptTotal);
        }
        return best;
    }
}
