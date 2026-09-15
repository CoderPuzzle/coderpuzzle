import java.util.HashSet;
import java.util.Set;

class Solution {

    public int closestToTarget(int[] arr, int target) {
        // prev holds the distinct AND-values of every subarray ending at the
        // previous index. AND only clears bits, so this set stays small
        // (O(log(max(arr))) entries) and updates cheaply from one index to
        // the next.
        int best = Math.abs(arr[0] - target);
        Set<Integer> prev = new HashSet<>();
        prev.add(arr[0]);
        for (int i = 1; i < arr.length; i++) {
            int value = arr[i];
            Set<Integer> cur = new HashSet<>();
            cur.add(value);
            for (int p : prev) {
                cur.add(p & value);
            }
            for (int v : cur) {
                best = Math.min(best, Math.abs(v - target));
            }
            prev = cur;
        }
        return best;
    }
}
