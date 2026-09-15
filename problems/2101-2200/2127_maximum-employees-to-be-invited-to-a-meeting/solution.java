import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int maximumInvitations(int[] favorite) {
        int n = favorite.length;
        // favorite defines a functional graph: disjoint cycles with in-trees
        // hanging off them.
        int[] indeg = new int[n];
        for (int f : favorite) {
            indeg[f]++;
        }

        // Kahn-style peel of the acyclic nodes: after it, depth[v] is the
        // node count of the longest chain of non-cycle employees leading
        // directly into v (at least 1 — itself), i.e. the arm length a
        // 2-cycle can absorb on that side.
        int[] depth = new int[n];
        java.util.Arrays.fill(depth, 1);
        Deque<Integer> queue = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            if (indeg[i] == 0) {
                queue.add(i);
            }
        }
        while (!queue.isEmpty()) {
            int u = queue.poll();
            int v = favorite[u];
            if (depth[u] + 1 > depth[v]) {
                depth[v] = depth[u] + 1;
            }
            if (--indeg[v] == 0) {
                queue.add(v);
            }
        }

        // Whatever still has positive indegree is a cycle node. A seating is
        // either one whole cycle >= 3 (outsiders can't join: every neighbor
        // seat is taken) or 2-cycles with both chains — and several pairs can
        // share one table, so those add up.
        int maxCycle = 0;
        int pairSum = 0;
        boolean[] visited = new boolean[n];
        for (int i = 0; i < n; i++) {
            if (indeg[i] > 0 && !visited[i]) {
                int cycleLen = 0;
                int cur = i;
                while (!visited[cur]) {
                    visited[cur] = true;
                    cycleLen++;
                    cur = favorite[cur];
                }
                if (cycleLen == 2) {
                    // The pair sits together; each side takes one chain.
                    pairSum += depth[i] + depth[favorite[i]];
                } else if (cycleLen > maxCycle) {
                    maxCycle = cycleLen;
                }
            }
        }
        return Math.max(maxCycle, pairSum);
    }
}
