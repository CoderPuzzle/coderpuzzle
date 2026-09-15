import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public int numFactoredBinaryTrees(int[] arr) {
        final long MOD = 1000000007L;
        Arrays.sort(arr);
        Map<Integer, Integer> index = new HashMap<>();
        for (int i = 0; i < arr.length; i++) {
            index.put(arr[i], i);
        }
        long[] dp = new long[arr.length]; // dp[i] = trees rooted at arr[i]
        Arrays.fill(dp, 1L);
        for (int i = 0; i < arr.length; i++) {
            int v = arr[i];
            long total = 1;
            for (int j = 0; j < i; j++) {
                if (v % arr[j] == 0) {
                    Integer otherIdx = index.get(v / arr[j]);
                    if (otherIdx != null) {
                        total += dp[j] * dp[otherIdx];
                    }
                }
            }
            dp[i] = total % MOD;
        }
        long sum = 0;
        for (long value : dp) {
            sum += value;
        }
        return (int) (sum % MOD);
    }
}
