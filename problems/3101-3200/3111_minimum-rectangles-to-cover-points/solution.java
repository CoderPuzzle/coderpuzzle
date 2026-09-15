import java.util.Arrays;

class Solution {

    public int minRectanglesToCoverPoints(int[][] points, int w) {
        // Height never matters -- a rectangle's top may rise arbitrarily,
        // so its reach is just the x-interval [start, start + w]. Sorting
        // the x coordinates reduces the task to packing them into the
        // fewest windows of width w: plant a window at the first
        // uncovered point, drop everything it reaches, repeat. With both
        // coordinates <= 10**9 the difference xs[i] - anchor cannot
        // overflow an int.
        int[] xs = new int[points.length];
        for (int i = 0; i < points.length; i++) {
            xs[i] = points[i][0];
        }
        Arrays.sort(xs);
        int count = 1;
        int anchor = xs[0];
        for (int i = 1; i < xs.length; i++) {
            if (xs[i] - anchor > w) {
                count++;
                anchor = xs[i];
            }
        }
        return count;
    }
}
