import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {

    public int maximumScore(int[] scores, int[][] edges) {
        int n = scores.length;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }

        // keep only the 3 highest-scoring neighbours of each node
        // (Collections.sort is stable, matching Python's sorted)
        List<List<Integer>> top3 = new ArrayList<>();
        for (List<Integer> neighbors : adj) {
            List<Integer> copy = new ArrayList<>(neighbors);
            Collections.sort(copy, (u, v) -> Integer.compare(scores[v], scores[u]));
            top3.add(copy.subList(0, Math.min(3, copy.size())));
        }

        int best = -1;
        for (int[] e : edges) {
            int a = e[0],
                b = e[1];
            int base = scores[a] + scores[b];
            for (int x : top3.get(a)) {
                if (x == b) continue;
                for (int y : top3.get(b)) {
                    if (y == a || x == y) continue;
                    int total = base + scores[x] + scores[y];
                    if (total > best) best = total;
                }
            }
        }
        return best;
    }
}
