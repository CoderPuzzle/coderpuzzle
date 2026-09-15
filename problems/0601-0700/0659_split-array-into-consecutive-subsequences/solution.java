import java.util.HashMap;
import java.util.Map;

class Solution {

    public boolean isPossible(int[] nums) {
        // One walk over the sorted array with two counter maps: left[v] is
        // the copies of v not yet placed, need[v] the subsequences whose
        // next wanted value is v. Placing x always prefers extending an
        // existing subsequence over starting a new one.
        Map<Integer, Integer> left = new HashMap<>();
        Map<Integer, Integer> need = new HashMap<>();
        for (int x : nums) {
            left.merge(x, 1, Integer::sum);
        }
        for (int x : nums) {
            // consumed by a run started earlier as its x+1/x+2
            if (left.getOrDefault(x, 0) == 0) continue;
            if (need.getOrDefault(x, 0) > 0) {
                // extend: the run that wanted x now wants x + 1
                left.merge(x, -1, Integer::sum);
                need.merge(x, -1, Integer::sum);
                need.merge(x + 1, 1, Integer::sum);
            } else if (left.getOrDefault(x + 1, 0) > 0 && left.getOrDefault(x + 2, 0) > 0) {
                // start a run of three: it eats the next two values ahead
                // of the walk and then wants x + 3
                left.merge(x, -1, Integer::sum);
                left.merge(x + 1, -1, Integer::sum);
                left.merge(x + 2, -1, Integer::sum);
                need.merge(x + 3, 1, Integer::sum);
            } else {
                // x can neither extend a run nor seed a legal new one
                return false;
            }
        }
        return true;
    }
}
