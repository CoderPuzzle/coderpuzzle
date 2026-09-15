import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[] distanceToCycle(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        int[] degree = new int[n];
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
            degree[e[0]] += 1;
            degree[e[1]] += 1;
        }

        // peel off degree-1 leaves; whatever remains is the unique cycle
        boolean[] removed = new boolean[n];
        Deque<Integer> queue = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            if (degree[i] == 1) queue.offer(i);
        }
        while (!queue.isEmpty()) {
            int u = queue.poll();
            removed[u] = true;
            for (int v : adj.get(u)) {
                if (!removed[v]) {
                    degree[v] -= 1;
                    if (degree[v] == 1) queue.offer(v);
                }
            }
        }

        // multi-source BFS from all cycle nodes
        int[] dist = new int[n];
        boolean[] visited = new boolean[n];
        Deque<Integer> bfs = new ArrayDeque<>();
        for (int u = 0; u < n; u++) {
            if (!removed[u]) {
                visited[u] = true;
                bfs.offer(u);
            }
        }
        while (!bfs.isEmpty()) {
            int u = bfs.poll();
            for (int v : adj.get(u)) {
                if (!visited[v]) {
                    visited[v] = true;
                    dist[v] = dist[u] + 1;
                    bfs.offer(v);
                }
            }
        }
        return dist;
    }
}
