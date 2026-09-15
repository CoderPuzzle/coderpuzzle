import java.util.*;

class Solution {

    public int[][] findCriticalAndPseudoCriticalEdges(int n, int[][] edges) {
        int m = edges.length;

        // Sort edge indices by weight once; every per-edge test reuses this order.
        Integer[] order = new Integer[m];
        for (int i = 0; i < m; i++) order[i] = i;
        Arrays.sort(order, (a, b) -> Integer.compare(edges[a][2], edges[b][2]));

        // base MST weight
        int baseWeight = 0;
        {
            int[] par = new int[n];
            int[] size = new int[n];
            for (int i = 0; i < n; i++) par[i] = i;
            Arrays.fill(size, 1);
            for (int idx : order) {
                if (union(par, size, edges[idx][0], edges[idx][1])) {
                    baseWeight += edges[idx][2];
                }
            }
        }

        List<Integer> critical = new ArrayList<>();
        List<Integer> pseudo = new ArrayList<>();
        // Deletion raising the weight (or disconnecting, seen as MAX_VALUE)
        // marks an edge critical; the forcing test runs only on survivors,
        // because a critical edge would also pass it.
        for (int i = 0; i < m; i++) {
            if (mstWeight(n, edges, order, i, -1) > baseWeight) {
                critical.add(i);
            } else if (mstWeight(n, edges, order, -1, i) == baseWeight) {
                pseudo.add(i);
            }
        }

        int[] crit = new int[critical.size()];
        for (int i = 0; i < crit.length; i++) crit[i] = critical.get(i);
        int[] pseu = new int[pseudo.size()];
        for (int i = 0; i < pseu.length; i++) pseu[i] = pseudo.get(i);
        return new int[][] { crit, pseu };
    }

    // Kruskal skipping edge `skip` (>= 0) and/or forcing edge `force` (>= 0) in first.
    // Returns Integer.MAX_VALUE when no spanning tree can be formed.
    private int mstWeight(int n, int[][] edges, Integer[] order, int skip, int force) {
        int[] par = new int[n];
        int[] size = new int[n];
        for (int i = 0; i < n; i++) par[i] = i;
        Arrays.fill(size, 1);

        int weight = 0;
        int used = 0;
        if (force >= 0) {
            union(par, size, edges[force][0], edges[force][1]);
            weight += edges[force][2];
            used++;
        }
        for (int idx : order) {
            if (idx == skip) continue;
            if (union(par, size, edges[idx][0], edges[idx][1])) {
                weight += edges[idx][2];
                used++;
            }
        }
        return used == n - 1 ? weight : Integer.MAX_VALUE;
    }

    private int find(int[] par, int x) {
        while (par[x] != x) {
            par[x] = par[par[x]];
            x = par[x];
        }
        return x;
    }

    private boolean union(int[] par, int[] size, int a, int b) {
        a = find(par, a);
        b = find(par, b);
        if (a == b) return false;
        if (size[a] < size[b]) {
            int t = a;
            a = b;
            b = t;
        }
        par[b] = a;
        size[a] += size[b];
        return true;
    }
}
