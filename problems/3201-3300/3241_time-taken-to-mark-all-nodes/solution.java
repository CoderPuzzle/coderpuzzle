import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[] timeTaken(int[][] edges) {
        // Reroot DP. Moving into node v costs 1 if v is odd, 2 if v is even.
        int n = edges.length + 1;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }

        // Iterative DFS ordering rooted at 0.
        int[] parent = new int[n];
        Arrays.fill(parent, -1);
        parent[0] = -2; // sentinel distinct from every node id
        int[] order = new int[n];
        int cnt = 0;
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(0);
        while (!stack.isEmpty()) {
            int u = stack.pop();
            order[cnt++] = u;
            for (int v : adj.get(u)) {
                if (v == parent[u]) continue;
                parent[v] = u;
                stack.push(v);
            }
        }

        int[] last = new int[n]; // max marking time within u's subtree
        int[] lastNo = new int[n]; // child attaining last[u]
        int[] second = new int[n]; // second-best child contribution
        Arrays.fill(lastNo, -1);
        for (int k = n - 1; k >= 0; k--) {
            int u = order[k];
            for (int v : adj.get(u)) {
                if (v == parent[u]) continue;
                int t = last[v] + (v % 2 == 0 ? 2 : 1);
                if (last[u] < t) {
                    second[u] = last[u];
                    last[u] = t;
                    lastNo[u] = v;
                } else if (second[u] < t) {
                    second[u] = t;
                }
            }
        }

        int[] answer = last.clone();
        int[] up = new int[n]; // best time outside u's subtree
        for (int k = 0; k < n; k++) {
            int u = order[k];
            for (int v : adj.get(u)) {
                if (v == parent[u]) continue;
                int base = v == lastNo[u] ? second[u] : last[u];
                int pl = Math.max(up[u], base) + (u % 2 == 0 ? 2 : 1);
                up[v] = pl;
                if (pl > answer[v]) answer[v] = pl;
            }
        }
        return answer;
    }
}
