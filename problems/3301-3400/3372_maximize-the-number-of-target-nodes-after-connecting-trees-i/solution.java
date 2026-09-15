import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] maxTargetNodes(int[][] edges1, int[][] edges2, int k) {
        // answer[i] = (nodes within k of i in tree 1) + max over v of
        // (nodes within k - 1 of v in tree 2): the connecting edge spends
        // one of the k steps, and queries are independent (hints 1-2).
        // With k = 0 the k - 1 limit floors to zero second-tree nodes.
        // Layer BFS is iterative — a 1000-node path would overflow the
        // judged -Xss512k stack.
        List<List<Integer>> adj1 = build(edges1),
            adj2 = build(edges2);
        int best2 = 0;
        for (int v = 0; v < adj2.size(); v++) {
            best2 = Math.max(best2, within(adj2, v, k - 1));
        }
        int[] answer = new int[adj1.size()];
        for (int u = 0; u < adj1.size(); u++) {
            answer[u] = within(adj1, u, k) + best2;
        }
        return answer;
    }

    private List<List<Integer>> build(int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i <= edges.length; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }
        return adj;
    }

    private int within(List<List<Integer>> adj, int start, int limit) {
        if (limit < 0) return 0;
        boolean[] seen = new boolean[adj.size()];
        seen[start] = true;
        int count = 1;
        List<Integer> frontier = new ArrayList<>();
        frontier.add(start);
        for (int depth = 0; depth < limit && !frontier.isEmpty(); depth++) {
            List<Integer> next = new ArrayList<>();
            for (int u : frontier) {
                for (int w : adj.get(u)) {
                    if (!seen[w]) {
                        seen[w] = true;
                        count++;
                        next.add(w);
                    }
                }
            }
            frontier = next;
        }
        return count;
    }
}
