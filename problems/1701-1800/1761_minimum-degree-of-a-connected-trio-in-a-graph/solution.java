import java.util.Arrays;

class Solution {

    public int minTrioDegree(int n, int[][] edges) {
        // A trio's degree is deg(u) + deg(v) + deg(w) - 6: the three
        // internal edges are exactly the ones double-counted by vertex
        // degrees. Rank the nodes by (degree, id) and keep each node's
        // neighbors as a bitset over those ranks; the cheapest trio
        // through an edge (u, v) uses the minimum-degree common
        // neighbor, which is the lowest set bit of mask[u] & mask[v].
        int[] deg = new int[n + 1];
        for (int[] e : edges) {
            deg[e[0]]++;
            deg[e[1]]++;
        }

        Integer[] order = new Integer[n];
        for (int i = 0; i < n; ++i) {
            order[i] = i + 1;
        }
        Arrays.sort(order, (a, b) -> deg[a] != deg[b] ? Integer.compare(deg[a], deg[b]) : Integer.compare(a, b));
        int[] rank = new int[n + 1];
        int[] degAt = new int[n];
        for (int p = 0; p < n; ++p) {
            rank[order[p]] = p;
            degAt[p] = deg[order[p]];
        }

        int words = (n + 63) >> 6;
        long[][] mask = new long[n + 1][words];
        for (int[] e : edges) {
            mask[e[0]][rank[e[1]] >> 6] |= 1L << (rank[e[1]] & 63);
            mask[e[1]][rank[e[0]] >> 6] |= 1L << (rank[e[0]] & 63);
        }

        int best = 3 * n;
        for (int[] e : edges) {
            long[] ma = mask[e[0]];
            long[] mb = mask[e[1]];
            for (int t = 0; t < words; ++t) {
                long common = ma[t] & mb[t];
                if (common != 0) {
                    int p = (t << 6) + Long.numberOfTrailingZeros(common);
                    int cand = deg[e[0]] + deg[e[1]] + degAt[p] - 6;
                    if (cand < best) {
                        best = cand;
                    }
                    break;
                }
            }
        }
        return best < 3 * n ? best : -1;
    }
}
