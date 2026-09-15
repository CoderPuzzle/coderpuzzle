import java.util.List;

class Solution {

    public long maximumSumScore(int[] nums) {
        // The suffix at i is total minus the prefix before it, so one
        // running total plus the array total covers every index in a single
        // pass.
        long total = 0;
        for (int value : nums) {
            total += value;
        }
        long prefix = 0;
        long best = Long.MIN_VALUE;
        for (int value : nums) {
            prefix += value;
            best = Math.max(best, Math.max(prefix, total - prefix + value));
        }
        return best;
    }
}
