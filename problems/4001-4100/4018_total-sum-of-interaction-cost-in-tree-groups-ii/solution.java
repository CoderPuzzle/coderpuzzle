import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    private static class St {

        Map<Integer, Integer> m = new HashMap<>();
        long a = 0;
        long b = 0;
    }

    public long interactionCosts(int n, int[][] edges, int[] group) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; ++i) {
            adj.add(new ArrayList<>());
        }
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }

        // Breadth-first order from the root; parents discovered on the way.
        int[] parent = new int[n];
        int[] order = new int[n];
        java.util.Arrays.fill(parent, -1);
        int head = 0;
        int tail = 0;
        order[tail++] = 0;
        while (head < tail) {
            int node = order[head++];
            for (int nxt : adj.get(node)) {
                if (nxt != parent[node]) {
                    parent[nxt] = node;
                    order[tail++] = nxt;
                }
            }
        }

        // Global size of each group label.
        long[] k = new long[n + 1];
        for (int g : group) {
            k[g]++;
        }

        // Each subtree state carries its group-count map plus
        // A = sum k[g]*cnt[g] and B = sum cnt[g]^2.
        St[] states = new St[n];
        long ans = 0;
        for (int i = n - 1; i >= 0; --i) {
            int v = order[i];
            int pv = parent[v];

            St base = null;
            for (int c : adj.get(v)) {
                if (c != pv && (base == null || states[c].m.size() > base.m.size())) {
                    base = states[c];
                }
            }
            if (base == null) {
                base = new St();
            }

            int g = group[v];
            base.m.merge(g, 1, Integer::sum);
            base.a += k[g];
            base.b += 2 * (base.m.get(g) - 1) + 1;

            for (int c : adj.get(v)) {
                if (c == pv || states[c] == base) {
                    continue;
                }
                for (Map.Entry<Integer, Integer> en : states[c].m.entrySet()) {
                    int gg = en.getKey();
                    int cc = en.getValue();
                    int old = base.m.getOrDefault(gg, 0);
                    base.a += k[gg] * cc;
                    base.b += 2L * old * cc + (long) cc * cc;
                    base.m.put(gg, old + cc);
                }
                states[c].m.clear();
            }

            if (v != 0) {
                // The edge above v carries sum of cnt*(k-cnt) = a - b.
                ans += base.a - base.b;
            }
            states[v] = base;
        }
        return ans;
    }
}
