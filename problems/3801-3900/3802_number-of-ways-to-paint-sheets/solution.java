import java.util.Arrays;

class Solution {

    public long numberOfWays(int n, int[] limit) {
        final long MOD = 1_000_000_007L;
        int m = limit.length;
        int[] a = limit.clone();
        Arrays.sort(a);
        // Breakpoints of the step function ways(x): x crossing 1, n, the
        // max() switch ceil(n / 2), L + 1 or n - L flips one of its num_ge
        // terms; ways is constant across each consecutive run.
        long[] points = new long[2 * m + 3];
        int count = 0;
        points[count++] = 1;
        points[count++] = n;
        points[count++] = (n + 1) / 2;
        for (int cap : a) {
            if (cap + 1 <= n) points[count++] = cap + 1;
            if (n - cap >= 1) points[count++] = n - cap;
        }
        Arrays.sort(points, 0, count);
        int unique = 0;
        for (int i = 0; i < count; i++) {
            if (i == 0 || points[i] != points[i - 1]) {
                points[unique++] = points[i];
            }
        }
        // One representative per run, scaled by the run length: the
        // per-split count never exceeds m^2 (fits long exactly), and the
        // reduced term times a run length < n stays inside i64.
        long total = 0;
        for (int i = 0; i + 1 < unique; i++) {
            long x = points[i];
            long run = points[i + 1] - x;
            long ways = numGe(a, x) * numGe(a, n - x) - numGe(a, Math.max(x, n - x));
            total = (total + (ways % MOD) * run) % MOD;
        }
        return total;
    }

    // Colors whose limit reaches t: m minus the sorted caps below t. The
    // i == j diagonal of a split needs one cap to cover max(x, n - x).
    private long numGe(int[] a, long t) {
        int lo = 0;
        int hi = a.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (a[mid] < t) lo = mid + 1;
            else hi = mid;
        }
        return a.length - lo;
    }
}
