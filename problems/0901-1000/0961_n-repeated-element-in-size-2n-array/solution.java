import java.util.HashSet;
import java.util.Set;

class Solution {

    public int repeatedNTimes(int[] nums) {
        // All but one value occurs exactly once, so the first value to appear
        // a second time can only be the one repeated n times. One pass keeps
        // a hash set of the values met so far and returns the moment the
        // current value is already a member; the n copies guarantee that
        // collision happens before the scan ends.
        Set<Integer> seen = new HashSet<>();
        for (int value : nums) {
            if (seen.contains(value)) {
                return value;
            }
            seen.add(value);
        }
        return -1;
    }
}
