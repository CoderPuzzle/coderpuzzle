import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public long maximumScoreAfterOperations(int[][] edges, int[] values) {
        // A tree stays healthy exactly when every root-to-leaf path keeps at
        // least one un-taken node. dp[x] is the best score inside x's subtree
        // while every x-to-leaf path must still keep a node: keep x (its value
        // stays, so every descendant is free to take: the child subtree sums)
        // or take x and let each child subtree solve the same problem (dp of
        // the children). A leaf must keep itself, so its dp is 0. The answer
        // is dp[0]. n reaches 2 * 10^4 on path-shaped trees, so the two walks
        // run on explicit arrays, never on the call stack.
        int n = values.length;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; ++i) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }
        // Iterative BFS from the root: fixes a parent for every node and an
        // order in which every parent precedes its children.
        int[] parent = new int[n];
        Arrays.fill(parent, -1);
        boolean[] hasChild = new boolean[n];
        int[] order = new int[n];
        order[0] = 0;
        parent[0] = 0;
        int count = 1;
        for (int head = 0; head < count; ++head) {
            int x = order[head];
            for (int y : adj.get(x)) {
                if (parent[y] == -1) {
                    parent[y] = x;
                    hasChild[x] = true;
                    order[count++] = y;
                }
            }
        }
        // Reverse order visits children before parents; each finished node
        // hands its subtree sum and dp value up to its parent.
        long[] subSum = new long[n];
        long[] dp = new long[n];
        for (int i = n - 1; i >= 0; --i) {
            int x = order[i];
            long here = values[x] + subSum[x];
            if (hasChild[x]) {
                dp[x] = Math.max(values[x] + dp[x], here - values[x]);
            }
            subSum[x] = here;
            if (x != 0) {
                subSum[parent[x]] += here;
                dp[parent[x]] += dp[x];
            }
        }
        return dp[0];
    }
}
