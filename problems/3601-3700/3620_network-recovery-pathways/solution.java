import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public int findMaxPathScore(int[][] edges, boolean[] online, long k) {
        int n = online.length;
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        int[] indeg = new int[n];
        for (int[] e : edges) {
            adj.get(e[0]).add(new int[] { e[1], e[2] });
            indeg[e[1]] += 1;
        }

        // Kahn's algorithm: the topological order is computed once and reused
        // by every feasibility check below (the graph is a DAG).
        java.util.ArrayDeque<Integer> queue = new java.util.ArrayDeque<>();
        for (int i = 0; i < n; i++) if (indeg[i] == 0) queue.add(i);
        List<Integer> topo = new ArrayList<>();
        while (!queue.isEmpty()) {
            int u = queue.poll();
            topo.add(u);
            for (int[] nb : adj.get(u)) {
                if (--indeg[nb[0]] == 0) queue.add(nb[0]);
            }
        }

        // Feasibility is monotone in the threshold (lowering it only adds
        // edges), so binary-search the sorted distinct edge costs for the
        // largest feasible score.
        Set<Long> costSet = new HashSet<>();
        for (int[] e : edges) costSet.add((long) e[2]);
        List<Long> costs = new ArrayList<>(costSet);
        Collections.sort(costs);

        final long INF = Long.MAX_VALUE;

        // If even with every edge allowed no budget-feasible path exists, no
        // score is achievable.
        if (!feasible(adj, topo, online, 0, n, INF, k)) return -1;
        if (costs.isEmpty()) return 0;
        int lo = 0,
            hi = costs.size() - 1;
        long ans = costs.get(0);
        while (lo <= hi) {
            int mid = (lo + hi) >>> 1;
            if (feasible(adj, topo, online, costs.get(mid), n, INF, k)) {
                ans = costs.get(mid);
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return (int) ans;
    }

    // feasible(s): a path from 0 to n-1 within budget k exists using only edges
    // of cost >= s and only online nodes. The cheapest such path is the right
    // witness, so distances are minimized in topological order.
    private boolean feasible(
        List<List<int[]>> adj,
        List<Integer> topo,
        boolean[] online,
        long s,
        int n,
        long INF,
        long k
    ) {
        long[] dist = new long[n];
        java.util.Arrays.fill(dist, INF);
        dist[0] = 0;
        for (int u : topo) {
            if (dist[u] == INF || !online[u]) continue;
            for (int[] nb : adj.get(u)) {
                int v = nb[0];
                long c = nb[1];
                if (c >= s && online[v]) {
                    long nd = dist[u] + c;
                    if (nd < dist[v]) dist[v] = nd;
                }
            }
        }
        return dist[n - 1] <= k;
    }
}
