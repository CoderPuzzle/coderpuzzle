import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public long maxScore(int[][] edges) {
        int n = edges.length;
        if (n == 1) return 0;
        List<List<Integer>> children = new ArrayList<>();
        for (int i = 0; i < n; i++) children.add(new ArrayList<>());
        for (int i = 1; i < n; i++) {
            children.get(edges[i][0]).add(i);
        }
        // Iterative preorder; iterating it in reverse finalizes every child
        // before its parent, so no recursion (n can be 1e5, deep chains).
        List<Integer> order = new ArrayList<>();
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(0);
        while (!stack.isEmpty()) {
            int u = stack.pop();
            order.add(u);
            for (int c : children.get(u)) stack.push(c);
        }
        // dp0[u]: parent edge not chosen; dp1[u]: chosen (its weight is
        // accounted by the parent, so dp1 only constrains u's own picks).
        long[] dp0 = new long[n];
        long[] dp1 = new long[n];
        for (int oi = order.size() - 1; oi >= 0; oi--) {
            int u = order.get(oi);
            // base = take no child edge: sum of children in state 0.
            long base = 0;
            long bestGain = 0;
            for (int c : children.get(u)) {
                long w = edges[c][1];
                base += dp0[c];
                // Switching c's edge on: child must drop its parent edge.
                long gain = dp1[c] + w - dp0[c];
                if (gain > bestGain) bestGain = gain;
            }
            // u may take at most one child edge; only a positive gain is
            // applied, so negative-weight edges are never forced in.
            dp0[u] = base + bestGain;
            // Parent edge taken => no child edge allowed for u.
            dp1[u] = base;
        }
        return dp0[0];
    }
}
