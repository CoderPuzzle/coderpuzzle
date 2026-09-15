import java.util.Arrays;

class Solution {

    public int longestConsecutive(int[] nums) {
        // Sorted copy leaves the caller's array untouched. Duplicates
        // become neighbours and every maximal chain becomes one contiguous
        // run of +1 steps, so a single walk measures them all.
        int[] ordered = nums.clone();
        Arrays.sort(ordered);
        int best = 0;
        int run = 0;
        int previous = 0;
        for (int index = 0; index < ordered.length; index++) {
            int value = ordered[index];
            if (index == 0 || value > previous + 1) {
                // A gap of two or more (or the very first entry) starts a
                // fresh chain.
                run = 1;
            } else if (value == previous + 1) {
                run += 1;
            }
            // An equal value is a duplicate of one already counted: the run
            // keeps its length.
            previous = value;
            best = Math.max(best, run);
        }
        // An empty array never enters the loop, so 0 falls out for free.
        return best;
    }
}
