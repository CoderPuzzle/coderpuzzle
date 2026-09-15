import java.util.HashMap;
import java.util.Map;

class Solution {

    public int minOperations(int[] target, int[] arr) {
        // Answer = target.length - LCS: each target element not kept costs
        // one insertion. target has distinct values, so rewriting arr as
        // target indices turns the LCS into a longest strictly increasing run.
        Map<Integer, Integer> index = new HashMap<>();
        for (int i = 0; i < target.length; i++) {
            index.put(target[i], i);
        }
        // Patience sorting: tails[k] = smallest tail of an increasing
        // subsequence of length k+1; the lower-bound search keeps it strictly
        // increasing (duplicate arr values map to one index and replace).
        int[] tails = new int[arr.length];
        int len = 0;
        for (int value : arr) {
            // Absent values never join a common subsequence and may stay.
            Integer idx = index.get(value);
            if (idx == null) continue;
            int v = idx;
            int lo = 0,
                hi = len;
            while (lo < hi) {
                int mid = (lo + hi) >>> 1;
                if (tails[mid] < v) lo = mid + 1;
                else hi = mid;
            }
            if (lo == len) {
                tails[len++] = v;
            } else {
                tails[lo] = v;
            }
        }
        return target.length - len;
    }
}
