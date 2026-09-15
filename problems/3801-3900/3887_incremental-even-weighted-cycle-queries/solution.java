class Solution {

    public int numberOfEdgesAdded(int n, int[][] edges) {
        int[] parent = new int[n];
        int[] rank = new int[n];
        int[] par = new int[n]; // xor distance from node to its parent
        for (int i = 0; i < n; i++) parent[i] = i;

        int[] rootOut = new int[2];
        int added = 0;
        for (int[] e : edges) {
            int u = e[0],
                v = e[1],
                w = e[2];
            find(u, parent, par, rootOut);
            int ru = rootOut[0],
                xu = rootOut[1];
            find(v, parent, par, rootOut);
            int rv = rootOut[0],
                xv = rootOut[1];
            if (ru == rv) {
                if ((xu ^ xv) == w) added++;
            } else {
                int rel = xu ^ xv ^ w;
                if (rank[ru] < rank[rv]) {
                    parent[ru] = rv;
                    par[ru] = rel;
                } else if (rank[ru] > rank[rv]) {
                    parent[rv] = ru;
                    par[rv] = rel;
                } else {
                    parent[ru] = rv;
                    par[ru] = rel;
                    rank[rv]++;
                }
                added++;
            }
        }
        return added;
    }

    // rootOut[0] = root, rootOut[1] = xor from x to root
    private void find(int x, int[] parent, int[] par, int[] rootOut) {
        int[] path = new int[parent.length];
        int len = 0;
        int cur = x;
        while (parent[cur] != cur) {
            path[len++] = cur;
            cur = parent[cur];
        }
        int root = cur;
        int xr = 0;
        for (int i = len - 1; i >= 0; i--) {
            int node = path[i];
            xr ^= par[node];
            parent[node] = root;
            par[node] = xr;
        }
        rootOut[0] = root;
        rootOut[1] = xr;
    }
}
