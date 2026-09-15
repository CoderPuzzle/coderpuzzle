import java.util.Arrays;
import java.util.Comparator;

class Solution {

    public long maximumCoins(int[][] coins, int k) {
        int n = coins.length;
        // stable sort by left endpoint
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; i++) order[i] = i;
        Arrays.sort(order, Comparator.comparingInt(i -> coins[i][0]));

        long[] lefts = new long[n];
        long[] rights = new long[n];
        long[] cs = new long[n];
        for (int idx = 0; idx < n; idx++) {
            int i = order[idx];
            lefts[idx] = coins[i][0];
            rights[idx] = coins[i][1];
            cs[idx] = coins[i][2];
        }
        // Each segment's total coin count, for summing fully covered runs.
        long[] area = new long[n];
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) {
            area[i] = cs[i] * (rights[i] - lefts[i] + 1);
            prefix[i + 1] = prefix[i] + area[i];
        }

        // An optimal window can always slide until its left end meets some li
        // or its right end meets some ri, so these 2n starts cover the optimum.
        // rights[i] - k + 1 may be negative; positions before 1 simply hold
        // nothing and the binary searches handle them.
        long best = 0;
        for (int i = 0; i < n; i++) {
            best = Math.max(best, window(lefts, rights, cs, area, prefix, k, lefts[i]));
            best = Math.max(best, window(lefts, rights, cs, area, prefix, k, rights[i] - k + 1));
        }
        return best;
    }

    private long window(long[] lefts, long[] rights, long[] cs, long[] area, long[] prefix, int k, long start) {
        // Coins inside [start, start + k - 1]. `a` is the first segment whose
        // right end reaches the window; `b` the last whose left end falls
        // inside it.
        long end = start + k - 1;
        int a = lowerBound(rights, start); // first index with rights[i] >= start
        int b = upperBound(lefts, end) - 1; // last index with lefts[i] <= end
        // No segment intersects the window.
        if (a > b) return 0;
        // Clip the two boundary segments to the window; the segments in
        // between are fully covered. Segments are disjoint, so clipping
        // both partial ends never double counts.
        long loA = Math.max(lefts[a], start);
        long hiA = Math.min(rights[a], end);
        if (a == b) {
            // Window meets only one segment: plain density * clipped length.
            return loA <= hiA ? cs[a] * (hiA - loA + 1) : 0;
        }
        long loB = Math.max(lefts[b], start);
        long hiB = Math.min(rights[b], end);
        // Full run from the prefix sum, then swap each boundary segment's
        // full area for its clipped part.
        long total = prefix[b + 1] - prefix[a];
        total += cs[a] * (hiA - loA + 1) - area[a];
        total += cs[b] * (hiB - loB + 1) - area[b];
        return total;
    }

    private int lowerBound(long[] arr, long target) {
        int lo = 0,
            hi = arr.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (arr[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }

    private int upperBound(long[] arr, long target) {
        int lo = 0,
            hi = arr.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (arr[mid] <= target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}
