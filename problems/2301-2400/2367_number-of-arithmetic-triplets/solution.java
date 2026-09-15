import java.util.HashSet;
import java.util.Set;

class Solution {

    public int arithmeticTriplets(int[] nums, int diff) {
        // Strictly increasing means every value occurs once, so a triplet is
        // determined by its middle: count elements whose value - diff and
        // value + diff are both present.
        Set<Integer> seen = new HashSet<>();
        for (int value : nums) {
            seen.add(value);
        }
        int count = 0;
        for (int value : nums) {
            if (seen.contains(value - diff) && seen.contains(value + diff)) {
                ++count;
            }
        }
        return count;
    }
}
