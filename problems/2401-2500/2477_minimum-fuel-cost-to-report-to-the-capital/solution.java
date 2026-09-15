import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int minimumFuelCost(int[][] roads, int seats) {
        int n = roads.length + 1;
        if (n == 1) return 0;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] r : roads) {
            adj.get(r[0]).add(r[1]);
            adj.get(r[1]).add(r[0]);
        }

        int[] parent = new int[n];
        java.util.Arrays.fill(parent, -1);
        boolean[] seen = new boolean[n];
        seen[0] = true;
        List<Integer> order = new ArrayList<>();
        Deque<Integer> queue = new ArrayDeque<>();
        queue.add(0);
        while (!queue.isEmpty()) {
            int u = queue.poll();
            order.add(u);
            for (int v : adj.get(u)) {
                if (!seen[v]) {
                    seen[v] = true;
                    parent[v] = u;
                    queue.add(v);
                }
            }
        }

        int[] size = new int[n];
        java.util.Arrays.fill(size, 1);
        int fuel = 0;
        for (int i = order.size() - 1; i >= 0; i--) {
            // children before parents
            int u = order.get(i);
            if (u == 0) continue;
            size[parent[u]] += size[u];
            fuel += (size[u] + seats - 1) / seats;
        }
        return fuel;
    }
}
