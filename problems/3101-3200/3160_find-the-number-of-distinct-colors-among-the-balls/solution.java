import java.util.HashMap;
import java.util.Map;

class Solution {

    public int[] queryResults(int limit, int[][] queries) {
        // Two maps carry the whole state: ball -> its current color, and
        // color -> how many balls currently wear it. A query is a pair of
        // counter bumps around a map read, and the size of the live-color
        // map answers the query without ever rescanning the balls.
        Map<Integer, Integer> ballColor = new HashMap<>();
        Map<Integer, Integer> colorCount = new HashMap<>();
        int[] result = new int[queries.length];
        for (int q = 0; q < queries.length; q++) {
            int ball = queries[q][0];
            int color = queries[q][1];
            Integer previous = ballColor.get(ball);
            if (previous != null) {
                int remaining = colorCount.get(previous) - 1;
                // The old color vanishes only when its last ball left.
                if (remaining == 0) {
                    colorCount.remove(previous);
                } else {
                    colorCount.put(previous, remaining);
                }
            }
            colorCount.merge(color, 1, Integer::sum);
            ballColor.put(ball, color);
            result[q] = colorCount.size();
        }
        return result;
    }
}
