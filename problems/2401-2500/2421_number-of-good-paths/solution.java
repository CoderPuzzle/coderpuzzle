import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    private int[] parent;
    private int[] size;

    public int numberOfGoodPaths(int[] vals, int[][] edges) {
        int n = vals.length;
        parent = new int[n];
        size = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            size[i] = 1;
        }

        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }

        Map<Integer, List<Integer>> byValue = new HashMap<>();
        for (int i = 0; i < n; i++) {
            byValue.computeIfAbsent(vals[i], x -> new ArrayList<>()).add(i);
        }

        long answer = 0;
        List<Integer> valueKeys = new ArrayList<>(byValue.keySet());
        java.util.Collections.sort(valueKeys);
        // Activate nodes in increasing value order: smaller values are
        // already merged, so unions only ever connect components whose
        // nodes are all <= v.
        for (int v : valueKeys) {
            for (int u : byValue.get(v)) {
                // Union across edges to already-active (<= v) endpoints:
                // the value-v nodes are then connected exactly through
                // paths whose interior nodes are all <= v.
                for (int w : adj.get(u)) {
                    if (vals[w] <= v) {
                        union(u, w);
                    }
                }
            }
            // Group this value's nodes by component; a component holding c
            // of them yields c*(c-1)/2 good paths (each unordered pair).
            Map<Integer, Integer> componentCount = new HashMap<>();
            for (int u : byValue.get(v)) {
                int r = find(u);
                componentCount.merge(r, 1, Integer::sum);
            }
            for (int c : componentCount.values()) {
                answer += ((long) c * (c - 1)) / 2;
            }
        }
        // Every single node is a good path on its own.
        return (int) (answer + n);
    }

    private int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    private void union(int a, int b) {
        int ra = find(a);
        int rb = find(b);
        if (ra == rb) {
            return;
        }
        if (size[ra] < size[rb]) {
            int t = ra;
            ra = rb;
            rb = t;
        }
        parent[rb] = ra;
        size[ra] += size[rb];
    }
}
