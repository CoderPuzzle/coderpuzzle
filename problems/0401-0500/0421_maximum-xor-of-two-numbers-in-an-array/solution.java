import java.util.HashSet;
import java.util.Set;

class Solution {

    public int findMaximumXOR(int[] nums) {
        int best = 0;
        int mask = 0;
        // Decide each answer bit from the MSB down: a set higher bit
        // dominates all lower bits, so keep it whenever some pair achieves it.
        for (int bit = 30; bit >= 0; bit--) {
            mask |= 1 << bit;
            // Prefixes = numbers truncated to the bits considered so far.
            Set<Integer> prefixes = new HashSet<>();
            for (int value : nums) {
                prefixes.add(value & mask);
            }
            int candidate = best | (1 << bit);
            // Achievable iff two prefixes XOR to candidate, i.e.
            // candidate ^ prefix is itself a prefix.
            boolean found = false;
            for (int prefix : prefixes) {
                if (prefixes.contains(candidate ^ prefix)) {
                    found = true;
                    break;
                }
            }
            if (found) {
                best = candidate;
            }
        }
        return best;
    }
}
