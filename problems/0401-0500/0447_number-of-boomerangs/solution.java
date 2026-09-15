import java.util.HashMap;
import java.util.Map;

class Solution {

    public int numberOfBoomerangs(int[][] points) {
        long total = 0;
        for (int i = 0; i < points.length; ++i) {
            // A boomerang is pinned by its apex: the other two points merely
            // have to sit at the same distance from it, so group every other
            // point by squared distance — equal squares mean equal lengths,
            // and no square root ever gets the chance to round.
            Map<Long, Integer> counts = new HashMap<>();
            for (int j = 0; j < points.length; ++j) {
                if (j == i) continue;
                long dx = points[j][0] - points[i][0];
                long dy = points[j][1] - points[i][1];
                counts.merge(dx * dx + dy * dy, 1, Integer::sum);
            }
            // c points at one distance fill the two ordered slots of the
            // tuple in c * (c - 1) ways — either of them may come first.
            for (int c : counts.values()) {
                total += (long) c * (c - 1);
            }
        }
        return (int) total;
    }
}
