import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    private long cross(int[] o, int[] a, int[] b) {
        return (long) (a[0] - o[0]) * (b[1] - o[1]) - (long) (a[1] - o[1]) * (b[0] - o[0]);
    }

    public int[][] outerTrees(int[][] trees) {
        int[][] sorted = trees.clone();
        Arrays.sort(sorted, (p, q) -> p[0] != q[0] ? Integer.compare(p[0], q[0]) : Integer.compare(p[1], q[1]));
        List<int[]> pointsList = new ArrayList<>();
        for (int[] p : sorted) {
            if (!pointsList.isEmpty()) {
                int[] last = pointsList.get(pointsList.size() - 1);
                if (last[0] == p[0] && last[1] == p[1]) continue;
            }
            pointsList.add(p);
        }
        int[][] points = pointsList.toArray(new int[0][]);
        if (points.length <= 1) {
            return points;
        }

        // Strict convex hull vertices (cross <= 0 pops collinear interior points).
        List<int[]> lower = new ArrayList<>();
        for (int[] p : points) {
            while (lower.size() >= 2 && cross(lower.get(lower.size() - 2), lower.get(lower.size() - 1), p) <= 0) {
                lower.remove(lower.size() - 1);
            }
            lower.add(p);
        }
        List<int[]> upper = new ArrayList<>();
        for (int i = points.length - 1; i >= 0; i--) {
            int[] p = points[i];
            while (upper.size() >= 2 && cross(upper.get(upper.size() - 2), upper.get(upper.size() - 1), p) <= 0) {
                upper.remove(upper.size() - 1);
            }
            upper.add(p);
        }
        List<int[]> hull = new ArrayList<>(lower.subList(0, lower.size() - 1));
        hull.addAll(upper.subList(0, upper.size() - 1));

        List<int[]> result = new ArrayList<>(hull);
        int n = hull.size();
        if (n < 2) {
            return points;
        }

        Set<Long> inResult = new HashSet<>();
        for (int[] p : hull) {
            inResult.add(((long) p[0] << 32) ^ p[1]);
        }
        // Add collinear points lying on hull edges (boundary points not at vertices).
        for (int i = 0; i < n; i++) {
            int[] a = hull.get(i);
            int[] b = hull.get((i + 1) % n);
            for (int[] p : points) {
                long pk = ((long) p[0] << 32) ^ p[1];
                if (inResult.contains(pk)) continue;
                if (cross(a, b, p) == 0) {
                    if (
                        Math.min(a[0], b[0]) <= p[0] &&
                        p[0] <= Math.max(a[0], b[0]) &&
                        Math.min(a[1], b[1]) <= p[1] &&
                        p[1] <= Math.max(a[1], b[1])
                    ) {
                        result.add(p);
                        inResult.add(pk);
                    }
                }
            }
        }
        return result.toArray(new int[0][]);
    }
}
