import java.util.*;

class Solution {

    public int lenLongestFibSubseq(int[] arr) {
        int n = arr.length;
        Map<Integer, Integer> indexOf = new HashMap<>();
        for (int i = 0; i < n; i++) {
            indexOf.put(arr[i], i);
        }
        // dp[j][i] = longest Fibonacci-like subsequence ending with arr[j], arr[i]
        int[][] dp = new int[n][n];
        for (int[] row : dp) {
            Arrays.fill(row, 2);
        }
        int best = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                int need = arr[i] - arr[j];
                if (need < arr[j] && indexOf.containsKey(need)) {
                    int k = indexOf.get(need);
                    dp[j][i] = dp[k][j] + 1;
                    if (dp[j][i] > best) {
                        best = dp[j][i];
                    }
                }
            }
        }
        return best >= 3 ? best : 0;
    }
}
