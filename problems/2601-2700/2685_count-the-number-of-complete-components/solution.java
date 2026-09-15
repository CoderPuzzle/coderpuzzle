class Solution {

    public int countCompleteComponents(int n, int[][] edges) {
        int[] parent = new int[n];
        int[] size = new int[n];
        for (int v = 0; v < n; v++) {
            parent[v] = v;
            size[v] = 1;
        }
        for (int[] edge : edges) {
            int ra = find(parent, edge[0]);
            int rb = find(parent, edge[1]);
            if (ra != rb) {
                if (size[ra] < size[rb]) {
                    int t = ra;
                    ra = rb;
                    rb = t;
                }
                parent[rb] = ra;
                size[ra] += size[rb];
            }
        }
        int[] edgeCount = new int[n];
        for (int[] edge : edges) {
            edgeCount[find(parent, edge[0])]++;
        }
        int complete = 0;
        for (int v = 0; v < n; v++) {
            if (find(parent, v) == v && edgeCount[v] == (size[v] * (size[v] - 1)) / 2) {
                complete++;
            }
        }
        return complete;
    }

    private int find(int[] parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
}
