import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public int maxIntersectionCount(int[] y) {
        // The count only changes when the line passes a vertex height, so
        // testing each compressed height v just above (v + 0.5) and exactly
        // at v suffices. Every segment stamps its half-level range
        // [lo, hi - 1] and its strict interior [lo + 1, hi - 1] into two
        // difference arrays; a prefix pass then reads both counts per
        // height, the at-level one plus a point for each vertex on the line.
        int[] heights = y.clone();
        Arrays.sort(heights);
        Map<Integer, Integer> rank = new HashMap<>();
        int[] uniq = new int[heights.length];
        int m = 0;
        for (int h : heights) {
            if (!rank.containsKey(h)) {
                rank.put(h, m);
                uniq[m++] = h;
            }
        }
        int[] above = new int[m];
        int[] at = new int[m];
        for (int i = 0; i + 1 < y.length; i++) {
            int lo = Math.min(y[i], y[i + 1]);
            int hi = Math.max(y[i], y[i + 1]);
            above[rank.get(lo)]++;
            above[rank.get(hi)]--;
            if (hi - lo > 1) {
                at[rank.get(lo) + 1]++;
                at[rank.get(hi)]--;
            }
        }
        Map<Integer, Integer> seen = new HashMap<>();
        for (int v : y) {
            seen.merge(v, 1, Integer::sum);
        }
        int best = 0;
        int spansAbove = 0;
        int spansAt = 0;
        for (int i = 0; i < m; i++) {
            spansAbove += above[i];
            spansAt += at[i];
            best = Math.max(best, Math.max(spansAbove, spansAt + seen.get(uniq[i])));
        }
        return best;
    }
}
