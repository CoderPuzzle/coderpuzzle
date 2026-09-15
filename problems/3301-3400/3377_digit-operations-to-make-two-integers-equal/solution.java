import java.util.*;

class Solution {

    public int minOperations(int n, int m) {
        // Every value n takes must be non-prime and keeps exactly
        // len(n) digits — decrementing a leading 1 is not a legal op —
        // so the states form a tiny graph: fewer than 1e4 nodes, at
        // most 8 single-digit +-1 moves each. Dijkstra with the
        // destination value as the edge weight and the start value as
        // the initial cost sums every value n takes, original included
        // (the example path 10 -> 20 -> 21 -> 22 -> 12 costs
        // 10+20+21+22+12 = 85). Each state contributes its value at
        // most once and weights are < 1e4, so costs stay under 1e8 —
        // safely inside 32-bit range.
        final int LIMIT = 10000;
        boolean[] isComp = new boolean[LIMIT];
        for (int i = 2; i < LIMIT; ++i) {
            if (!isComp[i]) {
                for (int j = i * i; j < LIMIT; j += i) isComp[j] = true;
            }
        }
        if (isPrime(n, isComp) || isPrime(m, isComp)) return -1;
        int top = 1;
        for (int w = Integer.toString(n).length(); w > 1; --w) top *= 10;
        int[] dist = new int[LIMIT];
        Arrays.fill(dist, -1);
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) ->
            a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(a[1], b[1])
        );
        dist[n] = n;
        heap.add(new int[] { n, n });
        while (!heap.isEmpty()) {
            int[] cur = heap.poll();
            int d = cur[0];
            int u = cur[1];
            if (d > dist[u]) continue;
            if (u == m) return d;
            for (int p = top; p >= 1; p /= 10) {
                int digit = (u / p) % 10;
                if (digit < 9) relax(d, u + p, dist, isComp, heap);
                if (digit > 0 && !(p == top && digit == 1)) {
                    relax(d, u - p, dist, isComp, heap);
                }
            }
        }
        return -1;
    }

    private void relax(int d, int y, int[] dist, boolean[] isComp, PriorityQueue<int[]> heap) {
        if (isPrime(y, isComp) || (dist[y] >= 0 && dist[y] <= d + y)) return;
        dist[y] = d + y;
        heap.add(new int[] { d + y, y });
    }

    private boolean isPrime(int v, boolean[] isComp) {
        return v >= 2 && !isComp[v];
    }
}
