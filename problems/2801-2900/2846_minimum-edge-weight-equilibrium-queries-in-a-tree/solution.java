class Solution {

    public int[] minOperationsQueries(int n, int[][] edges, int[][] queries) {
        // Adjacency as flat per-node arrays of (neighbor, weight) pairs: two
        // passes over the edge list, weights packed as node * 32 + (w - 1).
        int[] degree = new int[n];
        for (int[] edge : edges) {
            degree[edge[0]]++;
            degree[edge[1]]++;
        }
        int[][] adjacency = new int[n][];
        for (int node = 0; node < n; node++) {
            adjacency[node] = new int[degree[node]];
        }
        int[] fill = new int[n];
        for (int[] edge : edges) {
            adjacency[edge[0]][fill[edge[0]]++] = edge[1] * 32 + (edge[2] - 1);
            adjacency[edge[1]][fill[edge[1]]++] = edge[0] * 32 + (edge[2] - 1);
        }

        // One breadth-first search from node 0 fills every static structure:
        // parent/depth and a parent-before-child order that both the weight
        // frequency prefixes and the lifting table consume in one sweep. The
        // queue keeps a 10^4-node path off the call stack.
        int[] parent = new int[n];
        int[] pweight = new int[n];
        int[] depth = new int[n];
        boolean[] seen = new boolean[n];
        int[] order = new int[n];
        int count = 0;
        seen[0] = true;
        order[count++] = 0;
        for (int head = 0; head < count; head++) {
            int node = order[head];
            for (int packed : adjacency[node]) {
                int next = packed / 32;
                if (!seen[next]) {
                    seen[next] = true;
                    parent[next] = node;
                    pweight[next] = packed % 32;
                    depth[next] = depth[node] + 1;
                    order[count++] = next;
                }
            }
        }

        // Changing an edge to any value leaves other edges untouched, so an
        // operation fixes exactly one edge of the path and the answer is the
        // path length minus its most frequent edge weight. Weights live in
        // 1..26, so freq[w][v] counts weight-w edges from the root down to v;
        // on the a..b path that count is freq[a][w] + freq[b][w] - 2 *
        // freq[lca][w]: every edge above the lowest common ancestor appears
        // in both root paths and cancels, and the LCA's own incoming edge
        // cancels with itself.
        int[][] freq = new int[26][n];
        for (int index = 1; index < n && index < order.length; index++) {
            int node = order[index];
            for (int w = 0; w < 26; w++) {
                freq[w][node] = freq[w][parent[node]];
            }
            freq[pweight[node]][node]++;
        }

        // Binary lifting over the parent pointers: table[level][v] is the
        // 2^level-th ancestor of v (the root maps to itself), which makes
        // each query an O(log n) climb instead of a walk along the possibly
        // O(n) path. Every stored value stays below 2^17 << 2^31.
        int maxDepth = 0;
        for (int node = 0; node < n; node++) {
            maxDepth = Math.max(maxDepth, depth[node]);
        }
        int levels = 1;
        while (1 << levels <= maxDepth) {
            levels++;
        }
        int[][] table = new int[levels][];
        table[0] = parent;
        for (int level = 1; level < levels; level++) {
            int[] previous = table[level - 1];
            int[] current = new int[n];
            for (int node = 0; node < n; node++) {
                current[node] = previous[previous[node]];
            }
            table[level] = current;
        }

        int[] answer = new int[queries.length];
        for (int index = 0; index < queries.length; index++) {
            int a = queries[index][0];
            int b = queries[index][1];
            // u takes the deeper endpoint so the difference loop lifts it.
            int u = depth[a] >= depth[b] ? a : b;
            int v = u == a ? b : a;
            int diff = depth[u] - depth[v];
            int level = 0;
            while (diff > 0) {
                if ((diff & 1) != 0) {
                    u = table[level][u];
                }
                diff >>= 1;
                level++;
            }
            int lca;
            if (u != v) {
                for (level = levels - 1; level >= 0; level--) {
                    int[] row = table[level];
                    if (row[u] != row[v]) {
                        u = row[u];
                        v = row[v];
                    }
                }
                lca = parent[u];
            } else {
                lca = u;
            }
            int best = -1;
            for (int w = 0; w < 26; w++) {
                int cnt = freq[w][a] + freq[w][b] - 2 * freq[w][lca];
                if (cnt > best) {
                    best = cnt;
                }
            }
            int pathLength = depth[a] + depth[b] - 2 * depth[lca];
            answer[index] = pathLength - best;
        }
        return answer;
    }
}
