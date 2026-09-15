import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashSet;
import java.util.Set;

class Solution {

    public int rootCount(int[][] edges, int[][] guesses, int k) {
        int n = edges.length + 1;
        int[][] graph = buildAdj(edges, n);
        // Guess set of packed (parent, child) keys gives O(1) direction checks.
        Set<Long> guessSet = new HashSet<>();
        for (int[] g : guesses) {
            guessSet.add(key(g[0], g[1]));
        }

        // Iterative DFS from root 0 records each node's parent and an order
        // where parents precede children — rerooting without recursion, which
        // also sidesteps deep call stacks.
        int[] parent = new int[n];
        java.util.Arrays.fill(parent, -1);
        int[] order = new int[n];
        int orderLen = 0;
        boolean[] visited = new boolean[n];
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(0);
        visited[0] = true;
        while (!stack.isEmpty()) {
            int u = stack.pop();
            order[orderLen++] = u;
            for (int idx = 1; idx <= graph[u][0]; idx++) {
                int v = graph[u][idx];
                if (!visited[v]) {
                    visited[v] = true;
                    parent[v] = u;
                    stack.push(v);
                }
            }
        }

        int[] cnt = new int[n];
        // Correct-guess count for root 0: one point per edge whose
        // (parent, child) direction was guessed.
        for (int v = 1; v < n; v++) {
            if (guessSet.contains(key(parent[v], v))) {
                cnt[0]++;
            }
        }

        int ans = cnt[0] >= k ? 1 : 0;
        for (int oi = 1; oi < orderLen; oi++) {
            // Moving the root across edge p -> u flips only that one edge:
            // guess (p, u) becomes wrong and reversed guess (u, p) becomes
            // right. Parents come first in `order`, so cnt[p] is final here.
            int u = order[oi];
            int p = parent[u];
            int c = cnt[p];
            if (guessSet.contains(key(p, u))) {
                c--;
            }
            if (guessSet.contains(key(u, p))) {
                c++;
            }
            cnt[u] = c;
            if (c >= k) {
                ans++;
            }
        }
        return ans;
    }

    private static long key(int a, int b) {
        return ((long) a << 32) | (b & 0xFFFFFFFFL);
    }

    private static int[][] buildAdj(int[][] edges, int n) {
        int[] deg = new int[n];
        for (int[] e : edges) {
            deg[e[0]]++;
            deg[e[1]]++;
        }
        int[][] graph = new int[n][];
        for (int i = 0; i < n; i++) {
            graph[i] = new int[deg[i] + 1];
        }
        for (int[] e : edges) {
            graph[e[0]][++graph[e[0]][0]] = e[1];
            graph[e[1]][++graph[e[1]][0]] = e[0];
        }
        return graph;
    }
}
