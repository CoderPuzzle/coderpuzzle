import java.util.ArrayList;
import java.util.PriorityQueue;

class Solution {

    public int minimumCost(int n, int[][] connections) {
        // adjacency over n + 1 slots (index 0 unused; nodes are 1-based);
        // each link is filed once per direction
        ArrayList<int[]>[] adj = new ArrayList[n + 1];
        for (int i = 0; i <= n; i++) {
            adj[i] = new ArrayList<>();
        }
        for (int[] link : connections) {
            adj[link[0]].add(new int[] { link[2], link[1] });
            adj[link[1]].add(new int[] { link[2], link[0] });
        }
        // Prim: grow one tree outward from node 1; the cheapest offer
        // leaving the tree is always safe to buy
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
        heap.offer(new int[] { 0, 1 });
        boolean[] visited = new boolean[n + 1];
        int total = 0;
        int settled = 0;
        while (!heap.isEmpty() && settled < n) {
            int[] cur = heap.poll();
            int cost = cur[0];
            int v = cur[1];
            // stale-entry guard: v already joined via an offer at most
            // this cheap
            if (visited[v]) {
                continue;
            }
            visited[v] = true;
            total += cost;
            settled++;
            for (int[] entry : adj[v]) {
                if (!visited[entry[1]]) {
                    heap.offer(entry);
                }
            }
        }
        // queue drained before every node joined: the catalogue cannot
        // connect all n nodes
        return settled == n ? total : -1;
    }
}
