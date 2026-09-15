import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int maxScore(int[][] grid) {
        int n = grid.length;
        // value -> bitmask of rows containing that value
        Map<Integer, Integer> valueRows = new HashMap<>();
        for (int r = 0; r < n; r++) {
            for (int c : grid[r]) {
                valueRows.merge(c, 1 << r, (a, b) -> a | b);
            }
        }
        List<Integer> values = new ArrayList<>(valueRows.keySet());
        Collections.sort(values, Collections.reverseOrder());
        int full = 1 << n;
        int[] dp = new int[full];
        int[] ndp = new int[full];
        Arrays.fill(dp, -1);
        dp[0] = 0;
        for (int value : values) {
            int rows = valueRows.get(value);
            System.arraycopy(dp, 0, ndp, 0, full);
            for (int mask = 0; mask < full; mask++) {
                int cur = dp[mask];
                if (cur < 0) {
                    continue;
                }
                int rem = rows & ~mask;
                while (rem != 0) {
                    int bit = rem & -rem;
                    int nmask = mask | bit;
                    int cand = cur + value;
                    if (cand > ndp[nmask]) {
                        ndp[nmask] = cand;
                    }
                    rem &= rem - 1;
                }
            }
            int[] tmp = dp;
            dp = ndp;
            ndp = tmp;
        }
        int ans = 0;
        for (int v : dp) {
            ans = Math.max(ans, v);
        }
        return ans;
    }
}
