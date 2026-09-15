class Solution {

    public long minimumCost(String source, String target, String[] original, String[] changed, int[] cost) {
        // A conversion rule is a directed edge in the 26-letter cost graph;
        // the cheapest a->b conversion is the shortest path a->b.
        final long INF = Long.MAX_VALUE / 4;
        long[][] dist = new long[26][26];
        for (int i = 0; i < 26; i++) {
            for (int j = 0; j < 26; j++) {
                dist[i][j] = i == j ? 0 : INF;
            }
        }
        for (int e = 0; e < original.length; e++) {
            int a = original[e].charAt(0) - 'a';
            int b = changed[e].charAt(0) - 'a';
            // Duplicate rules for the same pair just keep the minimum cost.
            if (cost[e] < dist[a][b]) {
                dist[a][b] = cost[e];
            }
        }
        // Floyd–Warshall: relax every pair through each intermediate letter.
        for (int m = 0; m < 26; m++) {
            long[] row = dist[m];
            for (int i = 0; i < 26; i++) {
                long[] di = dist[i];
                long dim = di[m];
                if (dim == INF) continue;
                for (int j = 0; j < 26; j++) {
                    long nd = dim + row[j];
                    if (nd < di[j]) di[j] = nd;
                }
            }
        }
        // Matching characters convert for free; one unreachable pair fails all.
        long total = 0;
        int len = source.length();
        for (int p = 0; p < len; p++) {
            int s = source.charAt(p) - 'a';
            int t = target.charAt(p) - 'a';
            if (s == t) continue;
            long d = dist[s][t];
            if (d == INF) return -1;
            total += d;
        }
        return total;
    }
}
