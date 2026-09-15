import java.util.HashSet;
import java.util.Set;

class Solution {

    public int findFinalValue(int[] nums, int original) {
        // One O(1) hash-set lookup per doubling step replaces a fresh scan
        // of nums each time; values stay <= 2048 (double the 1000 cap), so
        // no type ever comes close to overflowing.
        Set<Integer> seen = new HashSet<>();
        for (int value : nums) {
            seen.add(value);
        }
        while (seen.contains(original)) {
            original *= 2;
        }
        return original;
    }
}
