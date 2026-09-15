import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public long countTheNumOfKFreeSubsets(int[] nums, int k) {
        int[] sorted = nums.clone();
        Arrays.sort(sorted);
        // Two elements conflict only when they differ by exactly k, which
        // chains values into arithmetic sequences: x joins x - k's group
        // when that predecessor exists, else starts a new one. Any
        // conflicting pair lands in the same chain, so groups are
        // independent.
        Map<Integer, Integer> groupOf = new HashMap<>();
        List<Integer> lengths = new ArrayList<>();
        for (int x : sorted) {
            Integer gid = groupOf.get(x - k);
            if (gid != null) {
                groupOf.put(x, gid);
                lengths.set(gid, lengths.get(gid) + 1);
            } else {
                groupOf.put(x, lengths.size());
                lengths.add(1);
            }
        }
        // Product over chains; 1 counts the empty subset of the whole array.
        long ans = 1;
        for (int length : lengths) {
            // A k-free subset of a chain omits chain-adjacent members —
            // independent sets of a path. dp[i] = dp[i-1] + dp[i-2] is a
            // Fibonacci shift; after `length` steps b is the chain's count.
            long a = 1,
                b = 1;
            for (int t = 0; t < length; t++) {
                long nb = a + b;
                a = b;
                b = nb;
            }
            ans *= b;
        }
        return ans;
    }
}
