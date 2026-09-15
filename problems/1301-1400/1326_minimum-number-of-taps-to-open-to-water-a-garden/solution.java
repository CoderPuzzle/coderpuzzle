import java.util.Arrays;

class Solution {

    public int minTaps(int n, int[] ranges) {
        int total = ranges.length;
        // Each tap becomes the interval [i-r, i+r] clamped to [0, n]; the task
        // is the classic minimum-interval-cover of the garden segment.
        int[][] intervals = new int[total][2];
        for (int i = 0; i < total; i++) {
            intervals[i][0] = Math.max(0, i - ranges[i]);
            intervals[i][1] = Math.min(n, i + ranges[i]);
        }
        // Sorting by left endpoint makes the sweep a single pass.
        Arrays.sort(intervals, (a, b) -> a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(a[1], b[1]));
        int count = 0;
        int covered = 0;
        int i = 0;
        while (covered < n) {
            // Among all intervals that start at or before the watered prefix,
            // take the farthest reach — the jump-game argument: any solution
            // must cross the current boundary, and the farthest reach leaves
            // the most room for the remaining cover.
            int reach = covered;
            while (i < total && intervals[i][0] <= covered) {
                reach = Math.max(reach, intervals[i][1]);
                // Once an interval's start exceeds `covered` it exceeds every
                // earlier value too, so i is never revisited.
                i++;
            }
            if (reach == covered) {
                // No interval connects to the watered prefix: unwatered gap.
                return -1;
            }
            covered = reach;
            count++;
        }
        return count;
    }
}
