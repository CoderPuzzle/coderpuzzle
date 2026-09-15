import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int countGoodNodes(int[][] edges) {
        int n = edges.length + 1;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }

        // Breadth-first order from the root: parents are always recorded
        // before their children, so reading this array backwards visits
        // every child before its parent -- an iterative post-order that
        // never touches the call stack.
        int[] order = new int[n];
        int[] parent = new int[n];
        boolean[] visited = new boolean[n];
        Arrays.fill(parent, -1);
        visited[0] = true;
        int head = 0,
            tail = 1;
        while (head < tail) {
            int u = order[head++];
            for (int v : adj.get(u)) {
                if (!visited[v]) {
                    visited[v] = true;
                    parent[v] = u;
                    order[tail++] = v;
                }
            }
        }

        // Reverse breadth-first order folds subtree sizes bottom-up: once
        // the fold reaches a node, every one of its descendants has
        // already been folded in, so size[i] ends as the number of nodes
        // in i's subtree.
        int[] size = new int[n];
        Arrays.fill(size, 1);
        for (int idx = n - 1; idx > 0; idx--) {
            size[parent[order[idx]]] += size[order[idx]];
        }

        // A node is good when its children's subtree sizes all agree.
        boolean[] good = new boolean[n];
        Arrays.fill(good, true);
        boolean[] seenChild = new boolean[n];
        int[] firstSize = new int[n];
        for (int idx = 1; idx < n; idx++) {
            int v = order[idx];
            int p = parent[v];
            if (!seenChild[p]) {
                seenChild[p] = true;
                firstSize[p] = size[v];
            } else if (size[v] != firstSize[p]) {
                good[p] = false;
            }
        }

        int ans = 0;
        for (boolean g : good) {
            if (g) ans++;
        }
        return ans;
    }
}
