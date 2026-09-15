import java.util.Arrays;

class Solution {

    public boolean simpleGraphExists(int[] degrees) {
        Arrays.sort(degrees);
        for (int lo = 0, hi = degrees.length - 1; lo < hi; lo++, hi--) {
            int tmp = degrees[lo];
            degrees[lo] = degrees[hi];
            degrees[hi] = tmp;
        }
        int n = degrees.length;
        long[] pre = new long[n + 1];
        for (int i = 0; i < n; i++) {
            pre[i + 1] = pre[i] + degrees[i];
        }
        long total = pre[n];
        // An odd degree sum can never pair up into edges.
        if (total % 2 != 0) {
            return false;
        }
        // big tracks how many entries still exceed k; it only moves left.
        int big = n;
        for (int k = 0; k <= n; k++) {
            while (big > 0 && degrees[big - 1] <= k) {
                big--;
            }
            long spared = (long) k * Math.max(big - k, 0) + total - pre[Math.max(big, k)];
            if (pre[k] > (long) k * (k - 1) + spared) {
                return false;
            }
        }
        return true;
    }
}
