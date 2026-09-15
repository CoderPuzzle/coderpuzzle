class Solution {

    private int[] parent;
    private int[] size;

    private int find(int a) {
        while (parent[a] != a) {
            parent[a] = parent[parent[a]];
            a = parent[a];
        }
        return a;
    }

    private boolean union(int a, int b) {
        a = find(a);
        b = find(b);
        if (a == b) return false;
        if (size[a] < size[b]) {
            int t = a;
            a = b;
            b = t;
        }
        parent[b] = a;
        size[a] += size[b];
        return true;
    }

    private boolean feasible(int x, int n, int[][] edges, int k) {
        parent = new int[n];
        size = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            size[i] = 1;
        }

        for (int[] e : edges) {
            if (e[3] == 1) {
                if (e[2] < x) return false;
                if (!union(e[0], e[1])) return false;
            }
        }
        for (int[] e : edges) {
            if (e[3] == 0 && e[2] >= x) union(e[0], e[1]);
        }
        int upgrades = 0;
        for (int[] e : edges) {
            if (e[3] == 0 && e[2] < x && 2 * e[2] >= x) {
                if (union(e[0], e[1])) {
                    upgrades++;
                    if (upgrades > k) return false;
                }
            }
        }
        int root = find(0);
        for (int i = 1; i < n; i++) {
            if (find(i) != root) return false;
        }
        return true;
    }

    public int maxStability(int n, int[][] edges, int k) {
        if (!feasible(1, n, edges, k)) return -1;
        int lo = 1,
            hi = 200001; // si <= 1e5 so 2*si <= 2e5
        while (lo + 1 < hi) {
            int mid = (lo + hi) >>> 1;
            if (feasible(mid, n, edges, k)) lo = mid;
            else hi = mid;
        }
        return lo;
    }
}
