import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;

class Solution {

    public double frogPosition(int n, int[][] edges, int t, int target) {
        if (n == 1) return 1.0;
        List<List<Integer>> neighbors = new ArrayList<>();
        for (int i = 0; i <= n; i++) neighbors.add(new ArrayList<>());
        for (int[] e : edges) {
            neighbors.get(e[0]).add(e[1]);
            neighbors.get(e[1]).add(e[0]);
        }

        // BFS from vertex 1; probability splits equally among unvisited
        // children. A leaf keeps its probability: the frog stays there forever.
        double[] prob = new double[n + 1];
        int[] depth = new int[n + 1];
        boolean[] visited = new boolean[n + 1];
        int[] childCount = new int[n + 1];
        ArrayDeque<Integer> queue = new ArrayDeque<>();
        queue.add(1);
        prob[1] = 1.0;
        visited[1] = true;
        while (!queue.isEmpty()) {
            int node = queue.poll();
            int children = 0;
            for (int nxt : neighbors.get(node)) if (!visited[nxt]) children++;
            childCount[node] = children;
            if (children > 0) {
                for (int nxt : neighbors.get(node)) {
                    if (visited[nxt]) continue;
                    visited[nxt] = true;
                    depth[nxt] = depth[node] + 1;
                    prob[nxt] = prob[node] / children;
                    queue.add(nxt);
                }
            }
        }

        if (depth[target] == t) return prob[target];
        if (depth[target] < t && childCount[target] == 0) return prob[target];
        return 0.0;
    }
}
