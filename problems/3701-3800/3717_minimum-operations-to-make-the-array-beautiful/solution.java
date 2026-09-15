import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int minOperations(int[] nums) {
        // Only increments exist and index 0 never moves, so a finished array
        // is a nondecreasing divisibility chain anchored at nums[0]. No
        // optimal chain runs above 2600: past max(nums) the chain could be
        // held flat for free (equal still divides), so only the last element
        // may sit higher, and its cheapest fix stays under predecessor + 50.
        final int cap = 2600;
        // Divisor lists of every final value, self inclusive -- holding the
        // previous height must remain a legal move.
        List<List<Integer>> divisors = new ArrayList<>();
        for (int v = 0; v <= cap; v++) {
            divisors.add(new ArrayList<>());
        }
        for (int u = 1; u <= cap; u++) {
            for (int m = u; m <= cap; m += u) {
                divisors.get(m).add(u);
            }
        }
        final int inf = Integer.MAX_VALUE;
        // dp[v]: cheapest way to make the processed prefix beautiful with the
        // last position holding exactly v.
        int[] dp = new int[cap + 1];
        Arrays.fill(dp, inf);
        dp[nums[0]] = 0;
        for (int i = 1; i < nums.length; i++) {
            int need = nums[i];
            int[] ndp = new int[cap + 1];
            Arrays.fill(ndp, inf);
            for (int v = need; v <= cap; v++) {
                int best = inf;
                for (int u : divisors.get(v)) {
                    if (dp[u] < best) {
                        best = dp[u];
                    }
                }
                if (best != inf) {
                    ndp[v] = best + v - need;
                }
            }
            dp = ndp;
        }
        int best = inf;
        for (int v : dp) {
            best = Math.min(best, v);
        }
        return best;
    }
}
