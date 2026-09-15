import java.util.Arrays;

class Solution {

    public int removeCoveredIntervals(int[][] intervals) {
        // Sort by start ascending, end DESCENDING: then any interval whose
        // end is not beyond the best end seen so far must sit inside some
        // earlier interval (equal starts sort the wider one first, so the
        // narrower twin is correctly counted as covered).
        Arrays.sort(intervals, (a, b) -> a[0] != b[0] ? a[0] - b[0] : b[1] - a[1]);
        int remaining = 0;
        int bestEnd = 0;
        for (int[] interval : intervals) {
            if (interval[1] > bestEnd) {
                remaining++;
                bestEnd = interval[1];
            }
        }
        return remaining;
    }
}
