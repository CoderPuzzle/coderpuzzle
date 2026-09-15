import java.util.HashSet;
import java.util.Set;

class Solution {

    public int longestConsecutive(int[] nums) {
        // The set collapses duplicates and makes membership an O(1) test.
        Set<Long> values = new HashSet<>();
        for (int value : nums) {
            values.add((long) value);
        }
        int best = 0;
        for (long value : values) {
            // Only a true run start (no value - 1 present) triggers a walk;
            // each maximal run has exactly one such start, which keeps the
            // nested loop linear: every element is touched at most twice.
            if (!values.contains(value - 1)) {
                int length = 1;
                // Walk upward through the run without sorting anything.
                while (values.contains(value + length)) {
                    length++;
                }
                best = Math.max(best, length);
            }
        }
        return best;
    }
}
