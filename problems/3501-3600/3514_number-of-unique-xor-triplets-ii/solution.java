import java.util.HashSet;
import java.util.Set;

class Solution {

    public int uniqueXorTriplets(int[] nums) {
        // The ordering i <= j <= k only picks which indices feed the XOR, and
        // XOR ignores order, so every triplet value is (pair XOR) ^ (third
        // element). Collect all pairwise XORs once, then spread them by every
        // element; values stay below 2^11, so both sets hold <= 2048 entries.
        Set<Integer> pairs = new HashSet<>();
        for (int a : nums) {
            for (int b : nums) {
                pairs.add(a ^ b);
            }
        }
        Set<Integer> triplets = new HashSet<>();
        for (int p : pairs) {
            for (int v : nums) {
                triplets.add(p ^ v);
            }
        }
        return triplets.size();
    }
}
