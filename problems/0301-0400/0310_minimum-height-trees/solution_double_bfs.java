import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int[] findMinHeightTrees(int n, int[][] edges) {
        List<List<Integer>> adjacency = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adjacency.add(new ArrayList<>());
        }
        for (int[] e : edges) {
            adjacency.get(e[0]).add(e[1]);
            adjacency.get(e[1]).add(e[0]);
        }
        int[] dist = new int[n];
        int[] parent = new int[n];
        // Two-shot diameter: the farthest node from any start is one end of
        // a longest path, and the farthest node from there is the other end.
        int u = farthestFrom(0, n, adjacency, dist, parent);
        int v = farthestFrom(u, n, adjacency, dist, parent);
        // Climb v back to u along discovery parents: the diameter path.
        int d = dist[v];
        int[] path = new int[d + 1];
        int x = v;
        for (int i = 0; i <= d; i++) {
            path[i] = x;
            x = parent[x];
        }
        // The minimal-height roots are the path's middle: one node when the
        // diameter has an even number of edges, two adjacent middles when odd.
        if (d % 2 == 0) {
            return new int[] { path[d / 2] };
        }
        int a = path[d / 2],
            b = path[d / 2 + 1];
        return a < b ? new int[] { a, b } : new int[] { b, a };
    }

    // One BFS from src: fills dist and parent, returns the farthest node
    // from src.
    private int farthestFrom(int src, int n, List<List<Integer>> adjacency, int[] dist, int[] parent) {
        Arrays.fill(dist, -1);
        dist[src] = 0;
        parent[src] = -1;
        ArrayDeque<Integer> queue = new ArrayDeque<>();
        queue.offer(src);
        while (!queue.isEmpty()) {
            int u = queue.poll();
            for (int v : adjacency.get(u)) {
                if (dist[v] < 0) {
                    dist[v] = dist[u] + 1;
                    parent[v] = u;
                    queue.offer(v);
                }
            }
        }
        int best = 0;
        for (int i = 1; i < n; i++) {
            if (dist[i] > dist[best]) {
                best = i;
            }
        }
        return best;
    }
}
