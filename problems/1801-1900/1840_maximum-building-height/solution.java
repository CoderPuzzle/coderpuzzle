import java.util.ArrayList;
import java.util.List;

class Solution {

    // Only restricted points (plus building 1 at height 0) matter. Sort
    // by id; two passes make each cap consistent with reachability from
    // its neighbors; between consecutive pinned points the best peak is
    // the floor of (lh + rh + gap) / 2, and past the last pin the height
    // simply ramps to its cap + distance.
    public int maxBuilding(int n, int[][] restrictions) {
        List<long[]> points = new ArrayList<>();
        points.add(new long[] { 1, 0 });
        for (int[] r : restrictions) {
            points.add(new long[] { r[0], r[1] });
        }
        points.sort((a, b) -> Long.compare(a[0], b[0]));
        for (int k = 1; k < points.size(); k++) {
            long[] prev = points.get(k - 1);
            long[] cur = points.get(k);
            long reachable = prev[1] + (cur[0] - prev[0]);
            if (reachable < cur[1]) {
                cur[1] = reachable;
            }
        }
        for (int k = points.size() - 2; k >= 0; k--) {
            long[] next = points.get(k + 1);
            long[] cur = points.get(k);
            long reachable = next[1] + (next[0] - cur[0]);
            if (reachable < cur[1]) {
                cur[1] = reachable;
            }
        }
        long best = 0;
        for (int k = 1; k < points.size(); k++) {
            long[] left = points.get(k - 1);
            long[] right = points.get(k);
            best = Math.max(best, (left[1] + right[1] + right[0] - left[0]) / 2);
        }
        long[] last = points.get(points.size() - 1);
        best = Math.max(best, last[1] + (n - last[0]));
        return (int) best;
    }
}
