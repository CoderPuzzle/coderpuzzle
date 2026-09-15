import java.util.HashSet;
import java.util.Set;

class Solution {

    public int maximalNetworkRank(int n, int[][] roads) {
        int[] degree = new int[n];
        Set<Long> connected = new HashSet<>();
        for (int[] road : roads) {
            int a = road[0];
            int b = road[1];
            degree[a]++;
            degree[b]++;
            int lo = Math.min(a, b);
            int hi = Math.max(a, b);
            connected.add((long) lo * n + hi);
        }

        int best = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int rank = degree[i] + degree[j];
                if (connected.contains((long) i * n + j)) {
                    rank--;
                }
                if (rank > best) {
                    best = rank;
                }
            }
        }
        return best;
    }
}
