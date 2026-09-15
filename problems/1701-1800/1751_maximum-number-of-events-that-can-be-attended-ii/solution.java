import java.util.Arrays;

class Solution {

    public long maxValue(int[][] events, int k) {
        // Sorted by end day, any compatible set read by finish time is a
        // subsequence of this order, so earlier choices sit to the left.
        Arrays.sort(events, (a, b) -> Integer.compare(a[1], b[1]));
        int n = events.length;
        int[] ends = new int[n];
        for (int i = 0; i < n; i++) {
            ends[i] = events[i][1];
        }
        // prev[i]: best value using the first i sorted events with one fewer
        // allowed attendance.
        long[] prev = new long[n + 1];
        int rounds = Math.min(k, n);
        for (int j = 0; j < rounds; j++) {
            long[] cur = new long[n + 1];
            long best = 0;
            for (int i = 1; i <= n; i++) {
                // Events ending strictly before this start are exactly the
                // first p sorted events (strict: may not start the day
                // another ends).
                int p = lowerBound(ends, events[i - 1][0]);
                long take = prev[p] + events[i - 1][2];
                // The running max carries the skip option forward.
                if (take > best) {
                    best = take;
                }
                cur[i] = best;
            }
            prev = cur;
        }
        return prev[n];
    }

    private static int lowerBound(int[] a, int target) {
        int lo = 0,
            hi = a.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (a[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}
