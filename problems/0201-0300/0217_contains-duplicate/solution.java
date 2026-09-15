import java.util.HashSet;
import java.util.Set;

class Solution {

    public boolean containsDuplicate(int[] nums) {
        // One pass with a set of already-visited values.
        Set<Integer> seen = new HashSet<>();
        for (int value : nums) {
            // add() returns false when the value was already present,
            // i.e. this is its second occurrence.
            if (!seen.add(value)) {
                return true;
            }
        }
        // Loop finished: every element was distinct at insertion time.
        return false;
    }
}
