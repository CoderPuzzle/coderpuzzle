import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class DistanceLimitedPathsExist {

    // A Kruskal minimum spanning forest annotated for max-edge queries:
    // uniting the edges cheapest first leaves, between every pair of
    // nodes, a tree path whose largest edge is as small as the graph
    // allows, so "some path uses only edges < limit" reduces to reading
    // that one tree path's maximum off a binary-lifting table.
    private final int[] depth;
    private final int[] rootOf;
    private final int levels;
    private final int[][] up;
    private final int[][] maxEdge;

    public DistanceLimitedPathsExist(int n, int[][] edgeList) {
        depth = new int[n];
        rootOf = new int[n];
        // Kruskal: sorting by distance and uniting components turns the
        // accepted edges into one minimum spanning tree per component.
        int[][] edges = edgeList.clone();
        Arrays.sort(edges, (a, b) -> Integer.compare(a[2], b[2]));
        int[] parent = new int[n];
        for (int node = 0; node < n; node++) {
            parent[node] = node;
        }
        List<int[]>[] adjacency = new ArrayList[n];
        for (int node = 0; node < n; node++) {
            adjacency[node] = new ArrayList<>();
        }
        for (int[] edge : edges) {
            int rootU = find(parent, edge[0]);
            int rootV = find(parent, edge[1]);
            if (rootU != rootV) {
                parent[rootU] = rootV;
                adjacency[edge[0]].add(new int[] { edge[1], edge[2] });
                adjacency[edge[1]].add(new int[] { edge[0], edge[2] });
            }
        }

        // One BFS per component fixes each node's root, depth, and
        // parent edge. A root's own parent entry stays (itself, 0), so a
        // lifting hop never runs off the top of its tree.
        int[] parent0 = new int[n];
        int[] weight0 = new int[n];
        for (int node = 0; node < n; node++) {
            parent0[node] = node;
            rootOf[node] = node;
        }
        boolean[] visited = new boolean[n];
        int[] queue = new int[n];
        for (int start = 0; start < n; start++) {
            if (visited[start]) {
                continue;
            }
            visited[start] = true;
            int head = 0;
            int tail = 1;
            queue[0] = start;
            while (head < tail) {
                int node = queue[head++];
                for (int[] next : adjacency[node]) {
                    if (!visited[next[0]]) {
                        visited[next[0]] = true;
                        rootOf[next[0]] = start;
                        depth[next[0]] = depth[node] + 1;
                        parent0[next[0]] = node;
                        weight0[next[0]] = next[1];
                        queue[tail++] = next[0];
                    }
                }
            }
        }

        // Lifting levels: up[j][node] is the 2^j-th ancestor and maxEdge
        // the largest weight on that hop — two half-hops glued together.
        int deepest = 0;
        for (int node = 0; node < n; node++) {
            deepest = Math.max(deepest, depth[node]);
        }
        levels = Math.max(1, Integer.SIZE - Integer.numberOfLeadingZeros(deepest + 1));
        up = new int[levels][];
        maxEdge = new int[levels][];
        up[0] = parent0;
        maxEdge[0] = weight0;
        for (int j = 1; j < levels; j++) {
            up[j] = new int[n];
            maxEdge[j] = new int[n];
            for (int node = 0; node < n; node++) {
                int half = up[j - 1][node];
                up[j][node] = up[j - 1][half];
                maxEdge[j][node] = Math.max(maxEdge[j - 1][node], maxEdge[j - 1][half]);
            }
        }
    }

    public boolean query(int p, int q, int limit) {
        // Distinct spanning trees means no path exists at any limit.
        if (rootOf[p] != rootOf[q]) {
            return false;
        }
        if (p == q) {
            return true;
        }
        int best = 0;
        int a = p;
        int b = q;
        if (depth[a] < depth[b]) {
            a = q;
            b = p;
        }
        // Lift the deeper node level by level until both depths match,
        // collecting every edge weight the hops pass over.
        int diff = depth[a] - depth[b];
        int level = 0;
        while (diff != 0) {
            if ((diff & 1) == 1) {
                best = Math.max(best, maxEdge[level][a]);
                a = up[level][a];
            }
            diff >>= 1;
            level++;
        }
        if (a == b) {
            return best < limit;
        }
        // Lift both together while their 2^level ancestors differ — that
        // stops just below the LCA — then take the final parent edges.
        for (int j = levels - 1; j >= 0; j--) {
            if (up[j][a] != up[j][b]) {
                best = Math.max(best, Math.max(maxEdge[j][a], maxEdge[j][b]));
                a = up[j][a];
                b = up[j][b];
            }
        }
        best = Math.max(best, Math.max(maxEdge[0][a], maxEdge[0][b]));
        return best < limit;
    }

    private static int find(int[] parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
}
