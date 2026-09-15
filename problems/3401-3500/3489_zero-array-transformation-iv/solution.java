import java.util.*;

class Solution {

    // Stream queries once; per index keep subset-sum reachability of the
    // vals seen so far (0/1 knapsack, one item per query) as a boolean
    // table, and stop updating an index once its target is reachable.
    public int minZeroArray(int[] nums, int[][] queries) {
        int n = nums.length;
        boolean[][] reach = new boolean[n][];
        boolean[] done = new boolean[n];
        int remaining = 0;
        for (int i = 0; i < n; i++) {
            if (nums[i] == 0) {
                done[i] = true;
            } else {
                reach[i] = new boolean[nums[i] + 1];
                reach[i][0] = true;
                remaining++;
            }
        }
        if (remaining == 0) {
            return 0;
        }
        for (int k = 0; k < queries.length; k++) {
            int l = queries[k][0],
                r = queries[k][1],
                val = queries[k][2];
            for (int i = l; i <= r; i++) {
                if (done[i] || val > nums[i]) {
                    continue;
                }
                boolean[] row = reach[i];
                for (int s = nums[i] - val; s >= 0; s--) {
                    if (row[s]) {
                        row[s + val] = true;
                    }
                }
                if (row[nums[i]]) {
                    done[i] = true;
                    remaining--;
                }
            }
            if (remaining == 0) {
                return k + 1;
            }
        }
        return -1;
    }
}
