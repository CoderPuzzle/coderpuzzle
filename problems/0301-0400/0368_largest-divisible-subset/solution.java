import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] largestDivisibleSubset(int[] nums) {
        // Divisibility is transitive, so in ascending order each element
        // need only be divisible by the previous one — a longest-chain DP.
        int[] arr = nums.clone();
        java.util.Arrays.sort(arr);
        int n = arr.length;
        if (n == 0) return new int[0];
        // dp[i] = size of the largest divisible subset ending at arr[i];
        // parent links let the subset be rebuilt, not just counted.
        int[] dp = new int[n];
        int[] parent = new int[n];
        for (int i = 0; i < n; i++) {
            dp[i] = 1;
            parent[i] = -1;
        }
        int best = 0;
        for (int i = 0; i < n; i++) {
            // Every earlier divisor offers the extension dp[j] + 1.
            for (int j = 0; j < i; j++) {
                if (arr[i] % arr[j] == 0 && dp[j] + 1 > dp[i]) {
                    dp[i] = dp[j] + 1;
                    parent[i] = j;
                }
            }
            if (dp[i] > dp[best]) best = i;
        }
        // Trace parent links from the largest chain, reverse to ascending.
        List<Integer> result = new ArrayList<>();
        for (int i = best; i != -1; i = parent[i]) result.add(arr[i]);
        int[] out = new int[result.size()];
        for (int k = 0; k < out.length; k++) out[k] = result.get(out.length - 1 - k);
        return out;
    }
}
