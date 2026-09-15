import java.util.Arrays;

class Solution {

    public int numberOfPairs(int[][] points) {
        // Sorting by x ascending, y descending puts both ends of every
        // valid pair in a fixed order: each anchor's partners come strictly
        // later in the array.
        Arrays.sort(points, (a, b) -> {
            int byX = Integer.compare(a[0], b[0]);
            return byX != 0 ? byX : Integer.compare(b[1], a[1]);
        });
        int total = 0;
        for (int i = 0; i < points.length; ++i) {
            int yi = points[i][1];
            // Every point already scanned between i and j has its x inside
            // the pair's span, so only the vertical window matters: best is
            // the largest y accepted so far, and yi >= yj > best holds
            // exactly when no other point lies in the closed rectangle —
            // rejected points are dominated by some accepted one, accepted
            // points are themselves inside it. Equal coordinates count as
            // on-the-line pairs; the border blocks everyone else.
            int best = -1; // coordinates are >= 0, so -1 is below everything
            for (int j = i + 1; j < points.length; ++j) {
                int yj = points[j][1];
                if (yi >= yj && yj > best) {
                    ++total;
                    best = yj;
                }
            }
        }
        return total;
    }
}
