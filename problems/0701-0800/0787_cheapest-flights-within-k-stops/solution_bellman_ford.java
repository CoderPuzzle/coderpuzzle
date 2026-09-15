class Solution {

    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        final int INF = Integer.MAX_VALUE / 2;
        // After r full rounds, dist[v] is the cheapest fare using at
        // most r edges; k stops allow k+1 flights, so run k+1 rounds.
        int[] dist = new int[n];
        java.util.Arrays.fill(dist, INF);
        dist[src] = 0;
        for (int i = 0; i < k + 1; i++) {
            // Relax from a frozen copy: writing in place would chain
            // several edges inside one round and exceed the stop limit.
            int[] ndist = dist.clone();
            boolean changed = false;
            for (int[] flight : flights) {
                int f = flight[0],
                    t = flight[1],
                    price = flight[2];
                if (dist[f] + price < ndist[t]) {
                    ndist[t] = dist[f] + price;
                    changed = true;
                }
            }
            dist = ndist;
            // A round that changed nothing never improves later rounds.
            if (!changed) break;
        }
        // Non-negative prices need no negative-cycle handling; a
        // surviving infinity means the destination is unreachable
        // within the allowance.
        return dist[dst] >= INF ? -1 : dist[dst];
    }
}
