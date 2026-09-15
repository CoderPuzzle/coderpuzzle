import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.List;

class Solution {

    public int findShortestCycle(int n, int[][] edges) {
        // BFS from every vertex: non-tree edges (u, v) close cycles of length
        // dist[u] + dist[v] + 1 through the root's levels, and scanning all
        // roots measures every cycle at one of its own vertices.
        List<List<Integer>> adj = new ArrayList<>();
        for (int v = 0; v < n; v++) {
            adj.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            adj.get(edge[1]).add(edge[0]);
        }
        int best = -1;
        int[] dist = new int[n];
        int[] parent = new int[n];
        Deque<Integer> queue = new ArrayDeque<>();
        for (int start = 0; start < n; start++) {
            Arrays.fill(dist, -1);
            Arrays.fill(parent, -1);
            dist[start] = 0;
            queue.offer(start);
            while (!queue.isEmpty()) {
                int u = queue.poll();
                for (int v : adj.get(u)) {
                    if (dist[v] == -1) {
                        dist[v] = dist[u] + 1;
                        parent[v] = u;
                        queue.offer(v);
                    } else if (parent[u] != v && parent[v] != u) {
                        // Tree edges would double-count one path instead of
                        // closing a ring, so only genuine cross links count.
                        int length = dist[u] + dist[v] + 1;
                        if (best == -1 || length < best) {
                            best = length;
                        }
                    }
                }
            }
        }
        return best;
    }
}
