import java.util.HashSet;
import java.util.Set;

class Solution {

    public int findMaxK(int[] nums) {
        // A positive k is valid exactly when -k sits in the same array, so
        // membership is the whole question -- drop every value into a hash
        // set once, then scan for the largest positive whose negation is
        // present. Values are nonzero by the constraints, so no value can
        // be its own partner.
        Set<Integer> seen = new HashSet<>();
        for (int value : nums) {
            seen.add(value);
        }
        int best = -1;
        for (int value : nums) {
            if (value > 0 && seen.contains(-value) && value > best) {
                best = value;
            }
        }
        return best;
    }
}
