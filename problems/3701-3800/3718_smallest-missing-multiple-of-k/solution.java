import java.util.HashSet;
import java.util.Set;

class Solution {

    public int missingMultiple(int[] nums, int k) {
        // The question is pure membership: drop every value into a hash set,
        // then walk the multiples of k upward until one is absent.
        Set<Integer> seen = new HashSet<>();
        for (int num : nums) {
            seen.add(num);
        }
        int candidate = k;
        while (seen.contains(candidate)) {
            candidate += k;
        }
        return candidate;
    }
}
