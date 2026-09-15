import java.util.*;

class Solution {

    public long shortestPath(int n, int[][] edges, String labels, int k) {
        List<int[]>[] g = new ArrayList[n];
        for (int i = 0; i < n; i++) g[i] = new ArrayList<>();
        for (int[] e : edges) g[e[0]].add(new int[] { e[1], e[2] });
        long I = Long.MAX_VALUE / 4;
        long[][] d = new long[n][k + 1];
        for (long[] a : d) Arrays.fill(a, I);
        PriorityQueue<long[]> q = new PriorityQueue<>(Comparator.comparingLong(a -> a[0]));
        d[0][1] = 0;
        q.add(new long[] { 0, 0, 1 });
        while (!q.isEmpty()) {
            long[] a = q.poll();
            long x = a[0];
            int u = (int) a[1],
                c = (int) a[2];
            if (x != d[u][c]) continue;
            for (int[] e : g[u]) {
                int v = e[0],
                    nc = labels.charAt(u) == labels.charAt(v) ? c + 1 : 1;
                if (nc <= k && x + e[1] < d[v][nc]) {
                    d[v][nc] = x + e[1];
                    q.add(new long[] { x + e[1], v, nc });
                }
            }
        }
        long z = I;
        for (long x : d[n - 1]) z = Math.min(z, x);
        return z == I ? -1 : z;
    }
}
