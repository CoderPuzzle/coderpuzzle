import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {

    public int[] countRectangles(int[][] rectangles, int[][] points) {
        List<List<Integer>> byHeight = new ArrayList<>();
        for (int h = 0; h <= 100; h++) {
            byHeight.add(new ArrayList<>());
        }
        for (int[] rect : rectangles) {
            byHeight.get(rect[1]).add(rect[0]);
        }
        for (List<Integer> lengths : byHeight) {
            Collections.sort(lengths);
        }

        int[] count = new int[points.length];
        for (int j = 0; j < points.length; j++) {
            int x = points[j][0],
                y = points[j][1];
            int total = 0;
            for (int h = y; h <= 100; h++) {
                List<Integer> lengths = byHeight.get(h);
                total += lengths.size() - lowerBound(lengths, x);
            }
            count[j] = total;
        }
        return count;
    }

    private int lowerBound(List<Integer> lengths, int x) {
        int lo = 0,
            hi = lengths.size();
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (lengths.get(mid) >= x) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }
}
