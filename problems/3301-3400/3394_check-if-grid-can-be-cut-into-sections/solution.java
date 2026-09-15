import java.util.ArrayList;
import java.util.List;

class Solution {

    public boolean checkValidCuts(int n, int[][] rectangles) {
        return hasTwoGaps(rectangles, 0) || hasTwoGaps(rectangles, 1);
    }

    private boolean hasTwoGaps(int[][] rectangles, int axis) {
        // Two cuts split the rectangles along one axis exactly when that
        // axis's [start, end] projections fall into three or more groups.
        // Sweep the sorted projections once with a running furthest end:
        // each next start at or beyond it is a gap where a cut can pass
        // (touching edges included), and two such gaps make three groups.
        List<int[]> intervals = new ArrayList<>();
        for (int[] r : rectangles) {
            intervals.add(new int[] { r[axis], r[axis + 2] });
        }
        intervals.sort((a, b) -> Integer.compare(a[0], b[0]));
        int gaps = 0;
        int reach = intervals.get(0)[1];
        for (int i = 1; i < intervals.size(); i++) {
            if (intervals.get(i)[0] >= reach) {
                gaps++;
                if (gaps == 2) {
                    return true;
                }
            }
            reach = Math.max(reach, intervals.get(i)[1]);
        }
        return false;
    }
}
