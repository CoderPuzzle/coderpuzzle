import java.util.HashSet;
import java.util.Set;

class Solution {

    public int longestConsecutive(int[] nums) {
        // A hash set answers "is this value present?" in O(1); iterating the
        // set itself also collapses duplicates before any walking starts.
        Set<Integer> values = new HashSet<>();
        for (int value : nums) {
            values.add(value);
        }
        int longest = 0;
        for (int value : values) {
            // value - 1 absent means value is where its maximal run begins.
            // Skipping every non-initial member is what keeps the walk linear:
            // without the check, each run would be re-traversed by all of its
            // members and the nested loops would go quadratic.
            if (!values.contains(value - 1)) {
                int length = 0;
                while (values.contains(value + length)) {
                    ++length;
                }
                longest = Math.max(longest, length);
            }
        }
        return longest;
    }
}
