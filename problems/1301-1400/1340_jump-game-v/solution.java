import java.util.ArrayList;
import java.util.List;

class Solution {

    public int maxJumps(int[] arr, int d) {
        // Process indices in increasing height order: every one-jump target
        // is strictly lower, so its dp value is already final when needed.
        int n = arr.length;
        List<Integer> order = new ArrayList<>(n);
        for (int i = 0; i < n; ++i) {
            order.add(i);
        }
        order.sort((a, b) -> Integer.compare(arr[a], arr[b]));
        int[] dp = new int[n];
        java.util.Arrays.fill(dp, 1);
        for (int i : order) {
            for (int j = i + 1; j < n && j - i <= d && arr[j] < arr[i]; ++j) {
                dp[i] = Math.max(dp[i], 1 + dp[j]);
            }
            for (int j = i - 1; j >= 0 && i - j <= d && arr[j] < arr[i]; --j) {
                dp[i] = Math.max(dp[i], 1 + dp[j]);
            }
        }
        int best = 0;
        for (int value : dp) {
            best = Math.max(best, value);
        }
        return best;
    }
}
