import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[][] removeInterval(int[][] intervals, int[] toBeRemoved) {
        // Per interval, three outcomes: disjoint from the removal (keep
        // whole), straddling the left edge (keep head), or straddling the
        // right edge (keep tail); a full cover keeps nothing. An interval
        // can only ever be cut into two pieces, never more.
        List<int[]> kept = new ArrayList<>();
        int removeStart = toBeRemoved[0];
        int removeEnd = toBeRemoved[1];
        for (int[] interval : intervals) {
            int start = interval[0];
            int end = interval[1];
            if (start >= removeEnd || end <= removeStart) {
                kept.add(interval);
                continue;
            }
            if (start < removeStart) {
                kept.add(new int[] { start, removeStart });
            }
            if (end > removeEnd) {
                kept.add(new int[] { removeEnd, end });
            }
        }
        return kept.toArray(new int[0][]);
    }
}
