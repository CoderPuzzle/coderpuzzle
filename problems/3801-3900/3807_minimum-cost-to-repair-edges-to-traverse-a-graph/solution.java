import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int minCost(int n, int[][] edges, int k) {
        int m = edges.length;
        int[] heads = new int[n];
        java.util.Arrays.fill(heads, -1);
        int[] next = new int[2 * m];
        int[] to = new int[2 * m];
        int[] wt = new int[2 * m];
        int cnt = 0;
        int maxW = 0;
        for (int[] e : edges) {
            to[cnt] = e[1];
            wt[cnt] = e[2];
            next[cnt] = heads[e[0]];
            heads[e[0]] = cnt++;
            to[cnt] = e[0];
            wt[cnt] = e[2];
            next[cnt] = heads[e[1]];
            heads[e[1]] = cnt++;
            if (e[2] > maxW) maxW = e[2];
        }

        int[] dist = new int[n];
        Deque<Integer> queue = new ArrayDeque<>();

        // If even repairing every edge fails (target unreachable, or every
        // path longer than k), there is no answer; otherwise can(hi) always
        // holds and the loop converges on the smallest feasible amount.
        if (!can(n, heads, next, to, wt, maxW, k, dist, queue)) return -1;
        int lo = 0,
            hi = maxW;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (can(n, heads, next, to, wt, mid, k, dist, queue)) hi = mid;
            else lo = mid + 1;
        }
        return lo;
    }

    // Budget `money` repairs exactly the edges with w <= money, so raising
    // money only adds usable edges: feasibility is monotone and the answer
    // is binary-searchable.
    private boolean can(
        int n,
        int[] heads,
        int[] next,
        int[] to,
        int[] wt,
        int money,
        int k,
        int[] dist,
        Deque<Integer> queue
    ) {
        java.util.Arrays.fill(dist, -1);
        queue.clear();
        dist[0] = 0;
        queue.add(0);
        // BFS explores level by level, so dist[v] is the fewest edges over
        // available paths; nodes already at k edges are never expanded.
        while (!queue.isEmpty()) {
            int u = queue.poll();
            if (dist[u] >= k) continue;
            for (int e = heads[u]; e != -1; e = next[e]) {
                int v = to[e];
                if (wt[e] <= money && dist[v] == -1) {
                    dist[v] = dist[u] + 1;
                    queue.add(v);
                }
            }
        }
        return dist[n - 1] != -1 && dist[n - 1] <= k;
    }
}
