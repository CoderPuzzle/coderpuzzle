import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int largestOverlap(int[][] img1, int[][] img2) {
        // A translation slides every 1 of one image by one shared vector, so
        // a 1 at (i1, j1) in img1 sits on a 1 at (i2, j2) in img2 exactly
        // under the shift that carries (i2, j2) onto (i1, j1) — the delta
        // between the two cells. Counting over all pairs of 1-cells how often
        // each delta occurs scores every shift at once, and the largest count
        // is the largest overlap. Delta components lie in [-29, 29], so the
        // packed key dr*100 + dc is injective.
        int n = img1.length;
        List<int[]> ones1 = new ArrayList<>();
        List<int[]> ones2 = new ArrayList<>();
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < n; ++j) {
                if (img1[i][j] == 1) ones1.add(new int[] { i, j });
                if (img2[i][j] == 1) ones2.add(new int[] { i, j });
            }
        }
        Map<Integer, Integer> counts = new HashMap<>();
        int best = 0;
        for (int[] a : ones1) {
            for (int[] b : ones2) {
                int delta = (a[0] - b[0]) * 100 + (a[1] - b[1]);
                best = Math.max(best, counts.merge(delta, 1, Integer::sum));
            }
        }
        return best;
    }
}
