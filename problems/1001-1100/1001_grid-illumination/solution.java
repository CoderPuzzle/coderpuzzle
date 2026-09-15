import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

class Solution {

    public boolean[] gridIllumination(int n, int[][] lamps, int[][] queries) {
        Map<Integer, Integer> row = new HashMap<>();
        Map<Integer, Integer> col = new HashMap<>();
        Map<Integer, Integer> diag = new HashMap<>();
        Map<Integer, Integer> antiDiag = new HashMap<>();
        Set<Long> on = new HashSet<>();

        for (int[] lamp : lamps) {
            int x = lamp[0];
            int y = lamp[1];
            if (!on.add(encode(x, y))) {
                continue;
            }
            row.merge(x, 1, Integer::sum);
            col.merge(y, 1, Integer::sum);
            diag.merge(x - y, 1, Integer::sum);
            antiDiag.merge(x + y, 1, Integer::sum);
        }

        boolean[] ans = new boolean[queries.length];
        for (int i = 0; i < queries.length; i++) {
            int x = queries[i][0];
            int y = queries[i][1];
            ans[i] =
                row.getOrDefault(x, 0) > 0 ||
                col.getOrDefault(y, 0) > 0 ||
                diag.getOrDefault(x - y, 0) > 0 ||
                antiDiag.getOrDefault(x + y, 0) > 0;

            for (int dx = -1; dx <= 1; dx++) {
                for (int dy = -1; dy <= 1; dy++) {
                    int px = x + dx;
                    int py = y + dy;
                    if (on.remove(encode(px, py))) {
                        row.merge(px, -1, Integer::sum);
                        col.merge(py, -1, Integer::sum);
                        diag.merge(px - py, -1, Integer::sum);
                        antiDiag.merge(px + py, -1, Integer::sum);
                    }
                }
            }
        }

        return ans;
    }

    private long encode(int x, int y) {
        return (long) x * 2_000_000_000L + y;
    }
}
