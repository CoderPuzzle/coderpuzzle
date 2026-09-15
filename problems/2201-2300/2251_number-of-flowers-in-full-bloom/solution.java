import java.util.Arrays;

class Solution {

    public int[] fullBloomFlowers(int[][] flowers, int[] people) {
        int n = flowers.length;
        int[] starts = new int[n];
        int[] ends = new int[n];
        for (int i = 0; i < n; i++) {
            starts[i] = flowers[i][0];
            ends[i] = flowers[i][1];
        }
        // The two sides can be sorted separately: a query never needs to know
        // which start belongs to which end, only the two one-sided counts.
        Arrays.sort(starts);
        Arrays.sort(ends);
        int[] res = new int[people.length];
        for (int i = 0; i < people.length; i++) {
            int t = people[i];
            // Blooming at t: start <= t and end >= t. upperBound counts
            // starts <= t (a flower starting exactly at t is blooming);
            // lowerBound counts ends < t, so a flower ending exactly at t is
            // still counted.
            res[i] = upperBound(starts, t) - lowerBound(ends, t);
        }
        return res;
    }

    // first index with value > t
    private int upperBound(int[] a, int t) {
        int lo = 0,
            hi = a.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (a[mid] <= t) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }

    // first index with value >= t
    private int lowerBound(int[] a, int t) {
        int lo = 0,
            hi = a.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (a[mid] < t) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}
