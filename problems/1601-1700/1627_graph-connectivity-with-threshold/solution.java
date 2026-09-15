class Solution {

    public boolean[] areConnected(int n, int threshold, int[][] queries) {
        int[] parent = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            parent[i] = i;
        }

        for (int z = threshold + 1; z <= n; z++) {
            if (z > 1 && find(parent, z) != z) {
                continue;
            }
            for (int multiple = 2 * z; multiple <= n; multiple += z) {
                union(parent, z, multiple);
            }
        }

        boolean[] result = new boolean[queries.length];
        for (int i = 0; i < queries.length; i++) {
            result[i] = find(parent, queries[i][0]) == find(parent, queries[i][1]);
        }
        return result;
    }

    private int find(int[] parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    private void union(int[] parent, int a, int b) {
        int ra = find(parent, a);
        int rb = find(parent, b);
        if (ra != rb) {
            parent[ra] = rb;
        }
    }
}
