import java.util.Arrays;

class Solution {

    public int eraseOverlapIntervals(int[][] intervals) {
        // Minimizing removals = maximizing kept non-overlapping intervals, so
        // sweep by earliest end: keeping the earliest-ending candidate leaves
        // the most room for everything after it.
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));
        int removed = 0;
        // Sentinel below any real endpoint (endpoints may be negative).
        long prevEnd = Long.MIN_VALUE;
        for (int[] interval : intervals) {
            // Touching endpoints do not overlap, so start == prevEnd keeps.
            if (interval[0] >= prevEnd) {
                prevEnd = interval[1];
            } else {
                // Discarded: it intersects the last kept (earliest-ending)
                // interval, so one removal per conflict is exactly optimal.
                removed++;
            }
        }
        return removed;
    }
}
