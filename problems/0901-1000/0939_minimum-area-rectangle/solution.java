import java.util.HashSet;
import java.util.Set;

class Solution {

    public int minAreaRect(int[][] points) {
        // A rectangle with sides parallel to the axes is pinned by two
        // opposite corners: (x1, y1) and (x2, y2) with x1 != x2 and
        // y1 != y2 close one exactly when (x1, y2) and (x2, y1) are also
        // present, and its area is |x1 - x2| * |y1 - y2|. Coordinates lie
        // in [0, 40000], so x * 40001 + y encodes a point as one unique
        // long, and every pair is tried as a candidate diagonal with two
        // O(1) membership tests deciding whether the rectangle exists.
        Set<Long> seen = new HashSet<>();
        for (int[] point : points) {
            seen.add(point[0] * 40001L + point[1]);
        }
        int best = 0;
        for (int i = 0; i < points.length; i++) {
            int x1 = points[i][0];
            int y1 = points[i][1];
            for (int j = i + 1; j < points.length; j++) {
                int x2 = points[j][0];
                int y2 = points[j][1];
                if (x1 == x2 || y1 == y2) {
                    continue; // a diagonal needs both coordinates to differ
                }
                if (seen.contains(x1 * 40001L + y2) && seen.contains(x2 * 40001L + y1)) {
                    int area = Math.abs(x1 - x2) * Math.abs(y1 - y2);
                    if (best == 0 || area < best) {
                        best = area;
                    }
                }
            }
        }
        return best;
    }
}
