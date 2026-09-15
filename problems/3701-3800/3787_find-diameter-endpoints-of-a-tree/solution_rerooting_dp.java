class Solution {

    public String findSpecialNodes(int n, int[][] edges) {
        int[] deg = new int[n];
        for (int[] e : edges) {
            deg[e[0]]++;
            deg[e[1]]++;
        }
        int[][] adj = new int[n][];
        for (int i = 0; i < n; i++) {
            adj[i] = new int[deg[i]];
        }
        int[] fill = new int[n];
        for (int[] e : edges) {
            adj[e[0]][fill[e[0]]++] = e[1];
            adj[e[1]][fill[e[1]]++] = e[0];
        }

        // Root at node 0 and sweep once for a BFS order plus parents: children
        // always sit after their parent in the order, and both passes lean on it.
        int[] parent = new int[n];
        java.util.Arrays.fill(parent, -1);
        int[] order = new int[n];
        int count = 0;
        order[count++] = 0;
        for (int head = 0; head < count; head++) {
            int u = order[head];
            for (int v : adj[u]) {
                if (v != parent[u]) {
                    parent[v] = u;
                    order[count++] = v;
                }
            }
        }

        // Down pass, over the order reversed so each child is final before its
        // parent reads it: down[v] is the height of v's subtree. The top two
        // child chains ride along because the up pass must route around a
        // parent's best arm when the path re-enters through that arm.
        int[] down = new int[n];
        int[] second = new int[n];
        int[] bestChild = new int[n];
        java.util.Arrays.fill(bestChild, -1);
        for (int i = count - 1; i >= 0; i--) {
            int v = order[i];
            int p = parent[v];
            if (p >= 0) {
                int chain = down[v] + 1;
                if (chain > down[p]) {
                    second[p] = down[p];
                    down[p] = chain;
                    bestChild[p] = v;
                } else if (chain > second[p]) {
                    second[p] = chain;
                }
            }
        }

        // Up pass, forward over the order: up[v] is the longest path leaving
        // v's subtree through its parent, and max(down[v], up[v]) is v's
        // eccentricity. A sibling arm stands in for the parent's best arm
        // exactly when v owns that arm, which is why second was kept.
        int[] up = new int[n];
        int diameter = 0;
        for (int i = 0; i < count; i++) {
            int v = order[i];
            int p = parent[v];
            if (p >= 0) {
                int arm = v == bestChild[p] ? second[p] : down[p];
                up[v] = Math.max(up[p], arm) + 1;
            }
            diameter = Math.max(diameter, Math.max(down[v], up[v]));
        }

        // A node terminates a diameter exactly when its eccentricity equals
        // the tree's widest path, so compare and print.
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            sb.append(Math.max(down[i], up[i]) == diameter ? '1' : '0');
        }
        return sb.toString();
    }
}
