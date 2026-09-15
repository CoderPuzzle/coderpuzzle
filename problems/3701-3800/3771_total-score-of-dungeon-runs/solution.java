import java.util.Arrays;

class Solution {

    public long totalScore(int hp, int[] damage, int[] requirement) {
        // pref[i] = total damage of rooms 1..i (pref[0] = 0). Starting at
        // room a+1, room b (b >= a+1) pays a point iff
        // hp - (pref[b] - pref[a]) >= requirement[b], i.e.
        // pref[a] >= requirement[b] - hp + pref[b]. Over all n(n+1)/2
        // subarrays this is a dominance count, done per b with a Fenwick
        // tree over compressed prefix sums holding pref[0..b-1]; failing
        // pairs (pref[a] < threshold) are subtracted from the total. Prefix
        // sums reach 1e9 and the answer n(n+1)/2 ~ 5e9, so long is used.
        int n = damage.length;
        long[] pref = new long[n + 1];
        for (int i = 0; i < n; i++) {
            pref[i + 1] = pref[i] + damage[i];
        }
        long[] values = pref.clone();
        Arrays.sort(values);
        int m = 1;
        for (int i = 1; i <= n; i++) {
            if (values[i] != values[m - 1]) {
                values[m++] = values[i];
            }
        }
        int[] bit = new int[m + 1];
        add(bit, lowerBound(values, m, pref[0]));
        long failing = 0;
        for (int b = 1; b <= n; b++) {
            long threshold = (long) requirement[b - 1] - hp + pref[b];
            // Number of inserted pref[a] with pref[a] < threshold.
            failing += prefix(bit, lowerBound(values, m, threshold));
            add(bit, lowerBound(values, m, pref[b]));
        }
        return ((long) n * (n + 1)) / 2 - failing;
    }

    // Count of values[0..m) strictly less than x.
    private static int lowerBound(long[] values, int m, long x) {
        int lo = 0,
            hi = m;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (values[mid] < x) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }

    private static void add(int[] bit, int pos) {
        for (int i = pos + 1; i < bit.length; i += i & -i) {
            bit[i]++;
        }
    }

    private static long prefix(int[] bit, int pos) {
        long total = 0;
        for (int i = pos; i > 0; i -= i & -i) {
            total += bit[i];
        }
        return total;
    }
}
