import java.util.Arrays;

class Solution {

    public int findMinArrowShots(int[][] points) {
        // Point-cover greedy: sort by right endpoint and shoot at the right
        // end of the first unburst balloon — among points covering it, the
        // right endpoint covers every interval any earlier point could.
        Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));
        int arrows = 0;
        // Sentinel below any coordinate (coordinates span signed 32-bit).
        long lastArrow = Long.MIN_VALUE;
        for (int[] point : points) {
            // Strict >: intervals are closed, so start == lastArrow is
            // already burst; otherwise shoot at the earliest end remaining.
            if (point[0] > lastArrow) {
                arrows++;
                lastArrow = point[1];
            }
        }
        return arrows;
    }
}
