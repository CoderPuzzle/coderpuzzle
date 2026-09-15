import java.util.HashSet;
import java.util.Set;

class Solution {

    public int subarrayBitwiseORs(int[] arr) {
        Set<Integer> seen = new HashSet<>();
        // current: distinct OR values of subarrays ending at this index.
        Set<Integer> current = new HashSet<>();
        for (int x : arr) {
            // Every subarray ending here is [x] alone or an old suffix OR
            // extended by x; OR never clears bits, so current stays small
            // (at most ~b+1 values for b-bit numbers).
            Set<Integer> nxt = new HashSet<>();
            for (int y : current) {
                nxt.add(x | y);
            }
            nxt.add(x);
            current = nxt;
            seen.addAll(current);
        }
        return seen.size();
    }
}
