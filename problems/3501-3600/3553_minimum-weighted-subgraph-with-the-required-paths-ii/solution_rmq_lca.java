import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public long[] minimumWeight(int[][] edges, int[][] queries) {
        int n = edges.length + 1;
        List<int[]>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
        }
        for (int[] e : edges) {
            adj[e[0]].add(new int[] { e[1], e[2] });
            adj[e[1]].add(new int[] { e[0], e[2] });
        }

        // Root at 0 and walk an Euler tour iteratively, so deep chains cannot
        // overflow the call stack. Every node enters the tour at its first
        // visit and re-enters each time a child's subtree closes, giving
        // 2n - 1 entries; first[v] is v's earliest slot in that sequence.
        int[] depth = new int[n];
        long[] dist = new long[n];
        int[] parent = new int[n];
        parent[0] = -1;
        int[] first = new int[n];
        int[] it = new int[n];
        int[] tour = new int[2 * n - 1];
        int m = 0;
        tour[m++] = 0;
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(0);
        while (!stack.isEmpty()) {
            int u = stack.peek();
            if (it[u] < adj[u].size()) {
                int[] e = adj[u].get(it[u]++);
                int v = e[0];
                if (v != parent[u]) {
                    parent[v] = u;
                    depth[v] = depth[u] + 1;
                    dist[v] = dist[u] + e[1];
                    first[v] = m;
                    tour[m++] = v;
                    stack.push(v);
                }
            } else {
                stack.pop();
                if (!stack.isEmpty()) {
                    tour[m++] = stack.peek();
                }
            }
        }

        // Sparse table: table[k][i] is the shallowest node over the 2^k tour
        // entries from i - the range argmin under depth comparison.
        int log = 32 - Integer.numberOfLeadingZeros(Math.max(1, m));
        int[][] table = new int[log][];
        table[0] = tour;
        for (int k = 1; k < log; k++) {
            int[] prev = table[k - 1];
            int half = 1 << (k - 1);
            int len = m - (1 << k) + 1;
            int[] cur = new int[len];
            for (int i = 0; i < len; i++) {
                cur[i] = depth[prev[i]] <= depth[prev[i + half]] ? prev[i] : prev[i + half];
            }
            table[k] = cur;
        }

        long[] answer = new long[queries.length];
        for (int q = 0; q < queries.length; q++) {
            int a = queries[q][0];
            int b = queries[q][1];
            int c = queries[q][2];
            answer[q] =
                (distance(a, b, dist, table, first, depth) +
                    distance(b, c, dist, table, first, depth) +
                    distance(c, a, dist, table, first, depth)) /
                2;
        }
        return answer;
    }

    private static int lca(int x, int y, int[] first, int[][] table, int[] depth) {
        int l = first[x];
        int r = first[y];
        if (l > r) {
            int t = l;
            l = r;
            r = t;
        }
        int k = 31 - Integer.numberOfLeadingZeros(r - l + 1);
        int a = table[k][l];
        int b = table[k][r - (1 << k) + 1];
        return depth[a] <= depth[b] ? a : b;
    }

    private static long distance(int x, int y, long[] dist, int[][] table, int[] first, int[] depth) {
        return dist[x] + dist[y] - 2 * dist[lca(x, y, first, table, depth)];
    }
}
