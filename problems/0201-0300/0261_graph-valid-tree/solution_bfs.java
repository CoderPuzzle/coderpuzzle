import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;
import java.util.Queue;

class Solution {

    public boolean validTree(int n, int[][] edges) {
        // A tree needs exactly n - 1 edges: fewer cannot connect n nodes,
        // more cannot stay acyclic — any other count fails immediately.
        if (edges.length != n - 1) {
            return false;
        }
        List<List<Integer>> adjacency = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adjacency.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adjacency.get(edge[0]).add(edge[1]);
            adjacency.get(edge[1]).add(edge[0]);
        }
        // With n - 1 edges on the table, connectivity is the only open
        // question: connected + n - 1 edges forces the graph to be a tree.
        boolean[] seen = new boolean[n];
        Queue<Integer> queue = new ArrayDeque<>();
        queue.offer(0);
        seen[0] = true;
        int visited = 1;
        while (!queue.isEmpty()) {
            int u = queue.poll();
            for (int v : adjacency.get(u)) {
                if (!seen[v]) {
                    seen[v] = true;
                    visited++;
                    queue.offer(v);
                }
            }
        }
        return visited == n;
    }
}
