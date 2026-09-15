import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {

    public int maxStarSum(int[] vals, int[][] edges, int k) {
        int n = vals.length;
        List<List<Integer>> neighbors = new ArrayList<>(n);
        for (int i = 0; i < n; i++) {
            neighbors.add(new ArrayList<>());
        }
        // Store neighbor values (not indices) while reading edges, so
        // each center later sees its candidates directly.
        for (int[] edge : edges) {
            neighbors.get(edge[0]).add(vals[edge[1]]);
            neighbors.get(edge[1]).add(vals[edge[0]]);
        }
        // The center alone is a legal star: seed with the best single
        // value, never 0, so all-negative inputs stay negative.
        int best = Integer.MIN_VALUE;
        for (int v : vals) {
            best = Math.max(best, v);
        }
        for (int i = 0; i < n; i++) {
            List<Integer> adjacent = neighbors.get(i);
            // For a fixed center the best subset is greedy: sorted
            // descending, take neighbors while they help.
            Collections.sort(adjacent, Collections.reverseOrder());
            int total = vals[i];
            int take = Math.min(k, adjacent.size());
            for (int j = 0; j < take; j++) {
                int value = adjacent.get(j);
                // A non-positive neighbor can only lower the sum.
                if (value <= 0) break;
                total += value;
            }
            if (total > best) best = total;
        }
        return best;
    }
}
