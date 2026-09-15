import java.util.HashSet;
import java.util.Set;

class Solution {

    public boolean splitArray(int[] nums) {
        // Fix the middle cut j: the four parts share one sum exactly when
        // some left split (0 < i < j - 1) balances — sum(0, i - 1) ==
        // sum(i + 1, j - 1) — and some right split (j + 1 < k < n - 1)
        // balances on the SAME value — sum(j + 1, k - 1) == sum(k + 1, n - 1).
        // Prefix sums turn every part into a difference of two table
        // entries: collect the balanced left values of this j in a set,
        // then scan k for a balanced right value already in the set.
        int n = nums.length;
        long[] prefix = new long[n + 1];
        for (int index = 0; index < n; ++index) {
            prefix[index + 1] = prefix[index] + nums[index];
        }
        for (int j = 3; j < n - 3; ++j) {
            Set<Long> seen = new HashSet<>();
            for (int i = 1; i < j - 1; ++i) {
                if (prefix[i] == prefix[j] - prefix[i + 1]) {
                    seen.add(prefix[i]);
                }
            }
            for (int k = j + 2; k < n - 1; ++k) {
                if (
                    prefix[k] - prefix[j + 1] == prefix[n] - prefix[k + 1] && seen.contains(prefix[k] - prefix[j + 1])
                ) {
                    return true;
                }
            }
        }
        return false;
    }
}
