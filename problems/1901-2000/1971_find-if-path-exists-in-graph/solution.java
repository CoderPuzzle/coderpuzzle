import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public boolean validPath(int n, int[][] edges, int source, int destination) {
        // Build the adjacency list, then run a breadth-first search from
        // source. The graph is undirected, so every edge is added in both
        // directions. A visited array keeps the search from re-processing
        // nodes; if destination is reached the path exists, and when the
        // queue empties without reaching it, no path can exist either.
        List<Integer>[] graph = new ArrayList[n];
        for (int node = 0; node < n; node++) {
            graph[node] = new ArrayList<>();
        }
        for (int[] edge : edges) {
            graph[edge[0]].add(edge[1]);
            graph[edge[1]].add(edge[0]);
        }
        if (source == destination) return true;
        boolean[] visited = new boolean[n];
        visited[source] = true;
        Deque<Integer> pending = new ArrayDeque<>();
        pending.add(source);
        while (!pending.isEmpty()) {
            int node = pending.poll();
            for (int neighbor : graph[node]) {
                if (neighbor == destination) return true;
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    pending.add(neighbor);
                }
            }
        }
        return false;
    }
}
