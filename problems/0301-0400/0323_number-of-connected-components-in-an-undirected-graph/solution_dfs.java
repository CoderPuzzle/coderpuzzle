import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int countComponents(int n, int[][] edges) {
        // Both directions per edge: the graph is undirected, so each
        // endpoint must list the other among its neighbors.
        List<List<Integer>> adjacency = new ArrayList<>();
        for (int i = 0; i < n; ++i) adjacency.add(new ArrayList<>());
        for (int[] e : edges) {
            adjacency.get(e[0]).add(e[1]);
            adjacency.get(e[1]).add(e[0]);
        }
        boolean[] visited = new boolean[n];
        int components = 0;
        for (int start = 0; start < n; start++) {
            if (visited[start]) {
                continue;
            }
            // An unvisited node during the sweep starts a new component;
            // this one traversal absorbs exactly one component.
            components++;
            visited[start] = true;
            Deque<Integer> stack = new ArrayDeque<>();
            stack.push(start);
            while (!stack.isEmpty()) {
                int node = stack.pop();
                for (int other : adjacency.get(node)) {
                    if (!visited[other]) {
                        // Mark at push time so no node is stacked twice;
                        // membership is by visitation, so a node shared by
                        // many edges is still discovered exactly once.
                        visited[other] = true;
                        stack.push(other);
                    }
                }
            }
        }
        return components;
    }
}
