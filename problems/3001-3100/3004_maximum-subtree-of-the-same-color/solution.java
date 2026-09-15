import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int maximumSubtreeSize(int[][] edges, int[] colors) {
        int n = colors.length;
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

        // mono[v] says every node in v's subtree so far shares v's color;
        // size[v] is how many nodes that monochrome run holds. A mixed
        // subtree poisons the parent outright; a clean one poisons it on
        // a color mismatch, otherwise it joins the parent's count.
        boolean[] mono = new boolean[n];
        Arrays.fill(mono, true);
        int[] size = new int[n];
        Arrays.fill(size, 1);
        int best = 1;

        // Reverse breadth-first order folds children into parents only
        // after every one of their own descendants has already folded in.
        for (int idx = n - 1; idx >= 0; idx--) {
            int u = order[idx];
            if (mono[u]) best = Math.max(best, size[u]);
            int p = parent[u];
            if (p != -1) {
                if (!mono[u] || colors[u] != colors[p]) mono[p] = false;
                else size[p] += size[u];
            }
        }
        return best;
    }
}
