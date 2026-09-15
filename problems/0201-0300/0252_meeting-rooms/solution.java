import java.util.Arrays;

class Solution {

    public boolean canAttendMeetings(int[][] intervals) {
        // Overlap, if any, must sit between next-door meetings once the
        // order is by start time, so sorting makes one linear pass enough.
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        // A meeting ending exactly when the next begins is fine: the clash
        // test is strictly previous end > next start.
        for (int i = 1; i < intervals.length; ++i) {
            if (intervals[i - 1][1] > intervals[i][0]) return false;
        }
        return true;
    }
}
