import java.util.HashSet;
import java.util.Set;

class Solution {

    public boolean isReflected(int[][] points) {
        // Reflection swaps the extreme columns, so the only axis that can
        // work is x = (minX + maxX) / 2: pin the sum s = minX + maxX.
        int minX = points[0][0],
            maxX = points[0][0];
        Set<Long> seen = new HashSet<>();
        for (int[] point : points) {
            minX = Math.min(minX, point[0]);
            maxX = Math.max(maxX, point[0]);
            seen.add(((long) point[0] << 32) | (point[1] & 0xffffffffL));
        }
        // The axis may fall between columns, so mirror with the integer sum:
        // every point needs its partner (s - x, y) in the set, where repeated
        // points simply collapse.
        long s = minX + maxX;
        for (int[] point : points) {
            int mirrorX = (int) (s - point[0]);
            if (!seen.contains(((long) mirrorX << 32) | (point[1] & 0xffffffffL))) return false;
        }
        return true;
    }
}
