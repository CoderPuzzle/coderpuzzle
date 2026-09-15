import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public int numberOfPaths(int n, int[][] corridors) {
        int[] degree = new int[n + 1];
        for (int[] corridor : corridors) {
            degree[corridor[0]]++;
            degree[corridor[1]]++;
        }

        List<Set<Integer>> forward = new ArrayList<>();
        for (int i = 0; i <= n; i++) forward.add(new HashSet<>());
        for (int[] corridor : corridors) {
            int u = corridor[0];
            int v = corridor[1];
            if (degree[u] > degree[v] || (degree[u] == degree[v] && u > v)) {
                int temporary = u;
                u = v;
                v = temporary;
            }
            forward.get(u).add(v);
        }

        int triangles = 0;
        for (int u = 1; u <= n; u++) {
            for (int v : forward.get(u)) {
                for (int w : forward.get(u)) {
                    if (forward.get(v).contains(w)) triangles++;
                }
            }
        }
        return triangles;
    }
}
