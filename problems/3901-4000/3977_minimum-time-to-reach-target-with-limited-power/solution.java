import java.util.*;

class Solution {

    public long[] minTimeMaxPower(int n, int[][] edges, int power, int[] cost, int source, int target) {
        List<int[]>[] g = new ArrayList[n];
        for (int i = 0; i < n; i++) g[i] = new ArrayList<>();
        for (int[] e : edges) g[e[0]].add(new int[] { e[1], e[2] });
        long I = Long.MAX_VALUE / 4;
        long[][] d = new long[n][power + 1];
        for (long[] a : d) Arrays.fill(a, I);
        PriorityQueue<long[]> q = new PriorityQueue<>(Comparator.comparingLong(a -> a[0]));
        d[source][power] = 0;
        q.add(new long[] { 0, source, power });
        while (!q.isEmpty()) {
            long[] a = q.poll();
            long x = a[0];
            int u = (int) a[1],
                p = (int) a[2];
            if (x != d[u][p]) continue;
            if (p >= cost[u]) for (int[] e : g[u])
                if (x + e[1] < d[e[0]][p - cost[u]]) {
                    d[e[0]][p - cost[u]] = x + e[1];
                    q.add(new long[] { x + e[1], e[0], p - cost[u] });
                }
        }
        long z = I;
        for (long x : d[target]) z = Math.min(z, x);
        if (z == I) return new long[] { -1, -1 };
        for (int p = power; p >= 0; p--) if (d[target][p] == z) return new long[] { z, p };
        return new long[] { -1, -1 };
    }
}
