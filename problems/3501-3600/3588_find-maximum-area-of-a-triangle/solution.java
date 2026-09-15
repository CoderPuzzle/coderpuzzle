import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public long maxArea(int[][] coords) {
        // A valid triangle needs a horizontal or vertical side. On a
        // horizontal line y the widest base is the x-span of that
        // line, and the tallest apex is the global top or bottom
        // point, whichever lies off the line — so every line
        // contributes two O(1) candidates once points are grouped.
        // Vertical sides mirror this. 2 * area <= 2 * (10^6)^2, so
        // long math is required.
        Map<Integer, List<Integer>> byY = new HashMap<>();
        Map<Integer, List<Integer>> byX = new HashMap<>();
        for (int[] p : coords) {
            byY.computeIfAbsent(p[1], k -> new ArrayList<>()).add(p[0]);
            byX.computeIfAbsent(p[0], k -> new ArrayList<>()).add(p[1]);
        }
        int gxmin = Integer.MAX_VALUE,
            gxmax = Integer.MIN_VALUE;
        int gymin = Integer.MAX_VALUE,
            gymax = Integer.MIN_VALUE;
        for (int x : byX.keySet()) {
            gxmin = Math.min(gxmin, x);
            gxmax = Math.max(gxmax, x);
        }
        for (int y : byY.keySet()) {
            gymin = Math.min(gymin, y);
            gymax = Math.max(gymax, y);
        }
        long best = -1;
        for (Map.Entry<Integer, List<Integer>> e : byY.entrySet()) {
            int y = e.getKey();
            List<Integer> row = e.getValue();
            if (row.size() < 2) {
                continue;
            }
            int lo = Integer.MAX_VALUE,
                hi = Integer.MIN_VALUE;
            for (int v : row) {
                lo = Math.min(lo, v);
                hi = Math.max(hi, v);
            }
            if (gymax != y) {
                best = Math.max(best, (long) (hi - lo) * (gymax - y));
            }
            if (gymin != y) {
                best = Math.max(best, (long) (hi - lo) * (y - gymin));
            }
        }
        for (Map.Entry<Integer, List<Integer>> e : byX.entrySet()) {
            int x = e.getKey();
            List<Integer> col = e.getValue();
            if (col.size() < 2) {
                continue;
            }
            int lo = Integer.MAX_VALUE,
                hi = Integer.MIN_VALUE;
            for (int v : col) {
                lo = Math.min(lo, v);
                hi = Math.max(hi, v);
            }
            if (gxmax != x) {
                best = Math.max(best, (long) (hi - lo) * (gxmax - x));
            }
            if (gxmin != x) {
                best = Math.max(best, (long) (hi - lo) * (x - gxmin));
            }
        }
        return best;
    }
}
