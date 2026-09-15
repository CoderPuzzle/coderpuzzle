import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int minReorder(int n, int[][] connections) {
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] conn : connections) {
            int a = conn[0],
                b = conn[1];
            adj.get(a).add(new int[] { b, 1 }); // original direction a -> b
            adj.get(b).add(new int[] { a, 0 });
        }
        int changed = 0;
        boolean[] visited = new boolean[n];
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(0);
        visited[0] = true;
        while (!stack.isEmpty()) {
            int node = stack.pop();
            for (int[] edge : adj.get(node)) {
                int nxt = edge[0],
                    direction = edge[1];
                if (visited[nxt]) continue;
                if (direction == 1) changed++;
                visited[nxt] = true;
                stack.push(nxt);
            }
        }
        return changed;
    }
}
