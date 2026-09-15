import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    private static final int BITS = 18;

    public int[] maxGeneticDifference(int[] parents, int[][] queries) {
        int n = parents.length;
        List<List<Integer>> children = new ArrayList<>();
        for (int i = 0; i < n; i++) children.add(new ArrayList<>());
        int root = -1;
        for (int i = 0; i < n; i++) {
            if (parents[i] == -1) root = i;
            else children.get(parents[i]).add(i);
        }

        List<List<int[]>> byNode = new ArrayList<>();
        for (int i = 0; i < n; i++) byNode.add(new ArrayList<>());
        for (int idx = 0; idx < queries.length; idx++) {
            byNode.get(queries[idx][0]).add(new int[] { queries[idx][1], idx });
        }

        int[] ans = new int[queries.length];

        // trie stored as flat arrays: children[bit] indices and subtree counts
        // capacity bound: 1 root + BITS per inserted value
        int cap = 1 + BITS * n + 2;
        int[][] nxt = new int[cap][2];
        int[] count = new int[cap];
        int[] nodeCount = { 1 }; // number of allocated trie nodes

        Deque<int[]> stack = new ArrayDeque<>(); // {node, exiting}
        stack.push(new int[] { root, 0 });
        while (!stack.isEmpty()) {
            int[] top = stack.pop();
            int u = top[0];
            if (top[1] == 1) {
                insert(u, -1, nxt, count, nodeCount);
                continue;
            }
            stack.push(new int[] { u, 1 });
            insert(u, 1, nxt, count, nodeCount);
            for (int[] q : byNode.get(u)) {
                ans[q[1]] = queryMax(q[0], nxt, count);
            }
            for (int v : children.get(u)) {
                stack.push(new int[] { v, 0 });
            }
        }

        return ans;
    }

    private static void insert(int x, int delta, int[][] nxt, int[] count, int[] nodeCount) {
        int node = 0;
        count[node] += delta;
        for (int b = BITS - 1; b >= 0; b--) {
            int bit = (x >> b) & 1;
            if (nxt[node][bit] == 0) {
                nxt[node][bit] = nodeCount[0];
                nodeCount[0]++;
            }
            node = nxt[node][bit];
            count[node] += delta;
        }
    }

    private static int queryMax(int x, int[][] nxt, int[] count) {
        int node = 0;
        int res = 0;
        for (int b = BITS - 1; b >= 0; b--) {
            int bit = (x >> b) & 1;
            int want = 1 - bit;
            int cand = nxt[node][want];
            if (cand != 0 && count[cand] > 0) {
                res |= 1 << b;
                node = cand;
            } else {
                node = nxt[node][bit];
            }
        }
        return res;
    }
}
