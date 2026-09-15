import java.util.ArrayList;
import java.util.List;

class Solution {

    private List<List<Integer>> adj;

    public int[] countSubtreesForEachDiameter(int n, int[][] edges) {
        adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            adj.get(edge[1]).add(edge[0]);
        }

        int[] ans = new int[n - 1];
        for (int mask = 1; mask < 1 << n; mask++) {
            int size = Integer.bitCount(mask);
            if (size < 2) {
                continue;
            }
            int start = Integer.numberOfTrailingZeros(mask) + 1;
            int[] first = farthestWithin(start, mask, n);
            if (first[2] != size) {
                continue;
            }
            int[] second = farthestWithin(first[0], mask, n);
            ans[second[1] - 1]++;
        }
        return ans;
    }

    // returns {farthestNode, farthestDistance, reachedCount}
    private int[] farthestWithin(int start, int mask, int n) {
        int[] dist = new int[n + 1];
        boolean[] visited = new boolean[n + 1];
        int[] queue = new int[n];
        int head = 0;
        int tail = 0;
        visited[start] = true;
        dist[start] = 0;
        queue[tail++] = start;
        int farNode = start;
        int farDist = 0;
        int reached = 1;
        while (head < tail) {
            int node = queue[head++];
            for (int nxt : adj.get(node)) {
                if (((mask >> (nxt - 1)) & 1) == 1 && !visited[nxt]) {
                    visited[nxt] = true;
                    dist[nxt] = dist[node] + 1;
                    reached++;
                    if (dist[nxt] > farDist) {
                        farDist = dist[nxt];
                        farNode = nxt;
                    }
                    queue[tail++] = nxt;
                }
            }
        }
        return new int[] { farNode, farDist, reached };
    }
}
