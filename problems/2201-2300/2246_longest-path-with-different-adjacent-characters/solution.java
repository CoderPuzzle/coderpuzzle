import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int longestPath(int[] parent, String s) {
        int n = parent.length;
        List<List<Integer>> children = new ArrayList<>();
        for (int i = 0; i < n; i++) children.add(new ArrayList<>());
        for (int i = 1; i < n; i++) {
            children.get(parent[i]).add(i);
        }

        // iterative DFS ordering (parents before children)
        List<Integer> order = new ArrayList<>(n);
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(0);
        while (!stack.isEmpty()) {
            int u = stack.pop();
            order.add(u);
            for (int v : children.get(u)) {
                stack.push(v);
            }
        }

        int best = 1;
        int[] down = new int[n]; // longest valid chain starting at u, going into its subtree
        for (int i = order.size() - 1; i >= 0; i--) {
            int u = order.get(i);
            int first = 0,
                second = 0;
            for (int v : children.get(u)) {
                int d = s.charAt(v) != s.charAt(u) ? down[v] : 0;
                if (d > first) {
                    second = first;
                    first = d;
                } else if (d > second) {
                    second = d;
                }
            }
            down[u] = first + 1;
            if (first + second + 1 > best) {
                best = first + second + 1;
            }
        }
        return best;
    }
}
