import java.util.HashMap;
import java.util.Map;

class Solution {

    public int maximumLength(int[] nums, int k) {
        // remap values to compact ids
        Map<Integer, Integer> mapping = new HashMap<>();
        int n = nums.length;
        int[] remapped = new int[n];
        for (int i = 0; i < n; i++) {
            Integer id = mapping.get(nums[i]);
            if (id == null) {
                id = mapping.size();
                mapping.put(nums[i], id);
            }
            remapped[i] = id;
        }
        int v = mapping.size();

        // dp[j][x] = max length of a good subsequence ending with value x
        // having exactly j transitions
        int[][] dp = new int[k + 1][v];
        int[] best1 = new int[k + 1]; // max over x of dp[j][x]
        int[] val1 = new int[k + 1]; // argmax
        int[] best2 = new int[k + 1]; // second max over x != val1
        java.util.Arrays.fill(val1, -1);

        for (int x : remapped) {
            int[] cand = new int[k + 1];
            for (int j = 0; j <= k; j++) {
                int c = dp[j][x] + 1; // extend a same-value subsequence
                if (j > 0) {
                    int top = val1[j - 1] != x ? best1[j - 1] : best2[j - 1];
                    int diff = top + 1; // append after a different value
                    if (diff > c) {
                        c = diff;
                    }
                }
                if (j == 0 && 1 > c) {
                    c = 1;
                }
                cand[j] = c;
            }
            for (int j = 0; j <= k; j++) {
                int nv = cand[j];
                if (nv <= dp[j][x]) {
                    continue;
                }
                dp[j][x] = nv;
                if (val1[j] == x) {
                    best1[j] = nv;
                } else {
                    if (nv > best1[j]) {
                        best2[j] = best1[j];
                        best1[j] = nv;
                        val1[j] = x;
                    } else if (nv > best2[j]) {
                        best2[j] = nv;
                    }
                }
            }
        }

        int ans = 0;
        for (int j = 0; j <= k; j++) {
            if (best1[j] > ans) {
                ans = best1[j];
            }
        }
        return ans;
    }
}
