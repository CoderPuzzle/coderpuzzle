class Solution {

    public int minScore(int n, int[][] roads) {
        // A path may reuse roads, so any road inside the connected
        // component of city 1 can be crossed on a detour and included in
        // the path's score. The answer is therefore the smallest distance
        // among the roads of that component. Union every road, then scan
        // for the minimum road fully inside city 1's component.
        int[] parent = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            parent[i] = i;
        }
        for (int[] r : roads) {
            unite(parent, r[0], r[1]);
        }
        int root = find(parent, 1);
        int best = 1000000000;
        for (int[] r : roads) {
            if (find(parent, r[0]) == root && r[2] < best) {
                best = r[2];
            }
        }
        return best;
    }

    private static int find(int[] parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    private static void unite(int[] parent, int a, int b) {
        int ra = find(parent, a);
        int rb = find(parent, b);
        if (ra != rb) {
            parent[ra] = rb;
        }
    }
}
