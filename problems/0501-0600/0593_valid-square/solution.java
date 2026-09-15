import java.util.Arrays;

class Solution {

    public boolean validSquare(int[] p1, int[] p2, int[] p3, int[] p4) {
        int[][] points = { p1, p2, p3, p4 };
        long[] d2 = new long[6];
        int k = 0;
        // Six pairs hide among four points — four sides and two diagonals.
        // Grouping by squared length compares exactly what distances
        // compare, so no square root ever gets the chance to round.
        for (int i = 0; i < 4; ++i) {
            for (int j = i + 1; j < 4; ++j) {
                long dx = points[j][0] - points[i][0];
                long dy = points[j][1] - points[i][1];
                d2[k++] = dx * dx + dy * dy;
            }
        }
        Arrays.sort(d2);
        // Sorted, a square is exactly the multiset a, a, a, a, b, b: the
        // four equal sides come first and the two equal diagonals after,
        // with a > 0 so a collapsed point cannot pose as a side.
        return d2[0] > 0 && d2[0] == d2[3] && d2[4] == d2[5] && d2[3] != d2[4];
    }
}
