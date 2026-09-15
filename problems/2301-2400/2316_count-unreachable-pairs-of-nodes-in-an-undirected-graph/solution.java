class Solution {

    public long countPairs(int n, int[][] edges) {
        // reachability in an undirected graph is an equivalence, so the answer
        // is all pairs minus the pairs inside one connected component
        int[] parent = new int[n];
        int[] size = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            size[i] = 1;
        }

        for (int[] e : edges) {
            int ra = find(parent, e[0]);
            int rb = find(parent, e[1]);
            if (ra != rb) {
                // union by size: the smaller tree hangs off the larger's root,
                // keeping trees shallow; size[root] stays the component's count
                if (size[ra] < size[rb]) {
                    int tmp = ra;
                    ra = rb;
                    rb = tmp;
                }
                parent[rb] = ra;
                size[ra] += size[rb];
            }
        }

        // each component is counted exactly once, at its root; its C(s, 2)
        // pairs are mutually reachable, every other pair is not
        // the count can approach 5*10^9 for n = 10^5, hence the long arithmetic
        long reachable = 0;
        for (int v = 0; v < n; v++) {
            if (find(parent, v) == v) {
                reachable += ((long) size[v] * (size[v] - 1)) / 2;
            }
        }
        return ((long) n * (n - 1)) / 2 - reachable;
    }

    private int find(int[] parent, int x) {
        // first pass locates the root, second rewires every visited node
        // directly to it: path compression without recursion
        int root = x;
        while (parent[root] != root) {
            root = parent[root];
        }
        while (parent[x] != root) {
            int next = parent[x];
            parent[x] = root;
            x = next;
        }
        return root;
    }
}
