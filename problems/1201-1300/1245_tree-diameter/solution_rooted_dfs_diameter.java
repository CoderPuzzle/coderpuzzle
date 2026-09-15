import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int treeDiameter(int[][] edges) {
        // No edges: a single-node tree, diameter 0.
        if (edges.length == 0) return 0;
        int n = edges.length + 1;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }

        // Iterative DFS from root 0 with an explicit stack. Each node is
        // recorded as it is popped, and entered only from the neighbor it
        // came from, so `order` meets parents before children.
        int[] parent = new int[n];
        java.util.Arrays.fill(parent, -1);
        int[] order = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(0);
        int count = 0;
        while (!stack.isEmpty()) {
            int u = stack.pop();
            order[count++] = u;
            for (int v : adj.get(u)) {
                if (v != parent[u]) {
                    parent[v] = u;
                    stack.push(v);
                }
            }
        }

        // Reversed, `order` is a bottom-up order: children settle before
        // parents. At each node the two deepest child heights combine:
        // their sum is the widest path turning there, the deeper one
        // alone is the node's own height for its parent.
        int[] height = new int[n];
        int diameter = 0;
        for (int i = n - 1; i >= 0; i--) {
            int u = order[i];
            int first = 0;
            int second = 0;
            for (int v : adj.get(u)) {
                if (v != parent[u]) {
                    int child = height[v] + 1;
                    if (child > first) {
                        second = first;
                        first = child;
                    } else if (child > second) {
                        second = child;
                    }
                }
            }
            height[u] = first;
            if (first + second > diameter) diameter = first + second;
        }
        return diameter;
    }
}
