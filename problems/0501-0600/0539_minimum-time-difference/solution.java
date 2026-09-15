import java.util.Arrays;

class Solution {

    public int findMinDifference(String[] timePoints) {
        // Only 24*60 distinct minute marks exist, so convert each "HH:MM"
        // once and sort: the closest pair must be adjacent in sorted order.
        int[] minutes = new int[timePoints.length];
        for (int index = 0; index < timePoints.length; ++index) {
            String time = timePoints[index];
            minutes[index] = Integer.parseInt(time.substring(0, 2)) * 60 + Integer.parseInt(time.substring(3));
        }
        Arrays.sort(minutes);
        // The clock wraps, so the first and last marks are also a pair —
        // the one that spans midnight; its gap is first + 1440 - last.
        int best = minutes[0] + 24 * 60 - minutes[minutes.length - 1];
        for (int index = 1; index < minutes.length; ++index) {
            best = Math.min(best, minutes[index] - minutes[index - 1]);
        }
        return best;
    }
}
