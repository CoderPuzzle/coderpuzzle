import java.util.Arrays;

class Solution {

    public int maxWidthOfVerticalArea(int[][] points) {
        int[] xs = new int[points.length];
        for (int i = 0; i < points.length; i++) {
            xs[i] = points[i][0];
        }
        Arrays.sort(xs);

        int widest = 0;
        for (int i = 1; i < xs.length; i++) {
            widest = Math.max(widest, xs[i] - xs[i - 1]);
        }
        return widest;
    }
}
