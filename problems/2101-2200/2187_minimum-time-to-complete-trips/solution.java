class Solution {

    public long minimumTime(int[] time, int totalTrips) {
        long mn = Long.MAX_VALUE;
        for (int x : time) {
            mn = Math.min(mn, x);
        }
        // The completed-trip total is non-decreasing in t, so binary search
        // the first feasible minute; the fastest bus alone bounds the answer.
        long lo = 1;
        long hi = mn * totalTrips;
        while (lo < hi) {
            long mid = (lo + hi) / 2;
            if (tripsDone(mid, time) >= totalTrips) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

    private long tripsDone(long t, int[] time) {
        // Buses run independently: each finishes t / x trips by minute t, so
        // the floor-sum is the exact trip count — no simulation.
        long total = 0;
        for (int x : time) {
            total += t / x;
        }
        return total;
    }
}
