import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int[] lastMarkedNodes(int[][] edges) {
        int n = edges.length + 1;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }

        // Marking spreads one BFS layer per second, so the last marked node
        // for a start i is a farthest node from i, and a farthest node from
        // any node is always an endpoint of a diameter. Two sweeps find the
        // diameter endpoints u and v; the distance arrays from both then
        // answer every i at once -- the farther endpoint is a last-marked
        // node, and on a tie either endpoint qualifies. The BFS walks an
        // explicit array queue, so nothing recurses.
        int[] distV = new int[n];
        int u = bfs(0, adj, new int[n]);
        int[] distU = new int[n];
        int v = bfs(u, adj, distU);
        bfs(v, adj, distV);
        int[] ans = new int[n];
        for (int i = 0; i < n; i++) {
            ans[i] = distU[i] > distV[i] ? u : v;
        }
        return ans;
    }

    private int bfs(int src, List<List<Integer>> adj, int[] dist) {
        int n = adj.size();
        Arrays.fill(dist, -1);
        dist[src] = 0;
        int[] queue = new int[n];
        int head = 0,
            tail = 0;
        queue[tail++] = src;
        int far = src;
        while (head < tail) {
            int node = queue[head++];
            for (int nxt : adj.get(node)) {
                if (dist[nxt] == -1) {
                    dist[nxt] = dist[node] + 1;
                    if (dist[nxt] > dist[far]) far = nxt;
                    queue[tail++] = nxt;
                }
            }
        }
        return far;
    }
}
