import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Queue;
import java.util.Set;

class Solution {

    public int reachableNodes(int n, int[][] edges, int[] restricted) {
        // One breadth-first sweep from node 0 over the tree, never entering a
        // restricted node; every dequeued node is counted exactly once.
        Set<Integer> blocked = new HashSet<>();
        for (int node : restricted) {
            blocked.add(node);
        }
        List<List<Integer>> adjacent = new ArrayList<>(n);
        for (int i = 0; i < n; ++i) {
            adjacent.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adjacent.get(edge[0]).add(edge[1]);
            adjacent.get(edge[1]).add(edge[0]);
        }
        boolean[] visited = new boolean[n];
        visited[0] = true;
        Queue<Integer> queue = new ArrayDeque<>();
        queue.offer(0);
        int reached = 0;
        while (!queue.isEmpty()) {
            int node = queue.poll();
            ++reached;
            for (int neighbor : adjacent.get(node)) {
                if (!visited[neighbor] && !blocked.contains(neighbor)) {
                    visited[neighbor] = true;
                    queue.offer(neighbor);
                }
            }
        }
        return reached;
    }
}
