import java.util.ArrayList;
import java.util.List;

class Solution {

    public int countCompleteComponents(int n, int[][] edges) {
        // Both directions per edge: the graph is undirected, so each
        // endpoint must list the other among its neighbors.
        List<List<Integer>> adjacency = new ArrayList<>();
        for (int v = 0; v < n; v++) {
            adjacency.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adjacency.get(edge[0]).add(edge[1]);
            adjacency.get(edge[1]).add(edge[0]);
        }
        boolean[] visited = new boolean[n];
        int[] stack = new int[n];
        int[] component = new int[n];
        int complete = 0;
        for (int start = 0; start < n; start++) {
            if (visited[start]) {
                continue;
            }
            // An unclaimed vertex opens a fresh component; one flood
            // collects exactly that component and nothing else.
            int top = 0;
            int k = 0;
            visited[start] = true;
            stack[top++] = start;
            while (top > 0) {
                int node = stack[--top];
                component[k++] = node;
                for (int other : adjacency.get(node)) {
                    if (!visited[other]) {
                        // Mark at push time so no vertex is stacked twice.
                        visited[other] = true;
                        stack[top++] = other;
                    }
                }
            }
            // A component of k vertices is fully wired exactly when every
            // member is adjacent to all k - 1 others.
            boolean wired = true;
            for (int i = 0; i < k; i++) {
                if (adjacency.get(component[i]).size() != k - 1) {
                    wired = false;
                    break;
                }
            }
            if (wired) {
                complete++;
            }
        }
        return complete;
    }
}
