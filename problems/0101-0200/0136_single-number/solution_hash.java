import java.util.HashSet;
import java.util.Set;

class Solution {

    public int singleNumber(int[] nums) {
        // Parity hash set: the first sight of a value adds it, the second
        // removes it — a paired element erases its own trace, so the set
        // holds exactly the values seen an odd number of times.
        Set<Integer> seen = new HashSet<>();
        for (int value : nums) {
            if (!seen.remove(value)) {
                seen.add(value);
            }
        }
        // Fold the odd-count survivors with XOR: even-count values cancel
        // in any XOR fold anyway, so this equals folding the whole array.
        int result = 0;
        for (int value : seen) {
            result ^= value;
        }
        return result;
    }
}
