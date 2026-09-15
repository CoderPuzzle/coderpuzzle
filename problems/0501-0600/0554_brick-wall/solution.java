import java.util.HashMap;
import java.util.Map;

class Solution {

    public int leastBricks(int[][] wall) {
        Map<Integer, Integer> edgeCounts = new HashMap<>();
        // Flip the question: a line at position p crosses a row unless that
        // row has a brick edge at p, so count edges per position.
        for (int[] row : wall) {
            int position = 0;
            // Prefix sums excluding the last brick: the final cumulative
            // width is the wall's right border, which is forbidden.
            for (int i = 0; i < row.length - 1; i++) {
                position += row[i];
                edgeCounts.merge(position, 1, Integer::sum);
            }
        }
        // Rows minus the most-shared edge position; 0 covers walls where
        // every row is a single brick.
        int bestEdges = 0;
        for (int count : edgeCounts.values()) {
            bestEdges = Math.max(bestEdges, count);
        }
        return wall.length - bestEdges;
    }
}
