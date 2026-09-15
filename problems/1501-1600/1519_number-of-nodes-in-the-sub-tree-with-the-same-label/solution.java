import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int[] countSubTrees(int n, int[][] edges, String labels) {
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

        // counts[i] tallies, per letter, how many nodes folded into i's
        // subtree so far carry that letter.
        int[][] counts = new int[n][26];
        for (int i = 0; i < n; i++) counts[i][labels.charAt(i) - 'a']++;

        // Reverse breadth-first order folds children into parents only
        // after every one of their own descendants has already folded in.
        for (int idx = n - 1; idx > 0; idx--) {
            int u = order[idx];
            int p = parent[u];
            for (int c = 0; c < 26; c++) counts[p][c] += counts[u][c];
        }

        int[] ans = new int[n];
        for (int i = 0; i < n; i++) ans[i] = counts[i][labels.charAt(i) - 'a'];
        return ans;
    }
}
