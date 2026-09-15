class Solution {

    public long maxRunTime(int n, int[] batteries) {
        long sum = 0;
        for (int b : batteries) {
            sum += b;
        }
        // Feasibility is monotone in t, so binary search the largest t; the
        // total charge over n computers is an absolute ceiling.
        long lo = 0;
        long hi = sum / n;
        while (lo < hi) {
            // Upper-mid keeps the search converging on the max feasible value.
            long mid = (lo + hi + 1) / 2;
            if (feasible(mid, n, batteries)) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return lo;
    }

    private boolean feasible(long t, int n, int[] batteries) {
        // Over a t-minute horizon a battery powers one computer at a time,
        // so it contributes at most min(b, t) computer-minutes; the capped
        // pool is freely schedulable, and n computers for t minutes need
        // exactly n*t.
        long total = 0;
        for (int b : batteries) {
            total += Math.min(b, t);
        }
        return total >= (long) n * t;
    }
}
