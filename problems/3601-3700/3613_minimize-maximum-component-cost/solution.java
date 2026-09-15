import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public int minCost(int n, int[][] edges, int k) {
        // k >= n lets every node sit alone: no cut is ever needed.
        if (k >= n) return 0;

        // Weights are >= 1, so t = 0 keeps no edges; if even the edgeless
        // split fits in k parts, nothing needs cutting.
        if (feasible(n, edges, k, 0)) return 0;
        // Feasibility is monotone in t and only changes at edge weights, so
        // binary search the sorted distinct weights for the smallest feasible.
        Set<Integer> weightSet = new HashSet<>();
        for (int[] e : edges) weightSet.add(e[2]);
        List<Integer> weights = new ArrayList<>(weightSet);
        Collections.sort(weights);
        int lo = 0,
            hi = weights.size() - 1;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (feasible(n, edges, k, weights.get(mid))) hi = mid;
            else lo = mid + 1;
        }
        return weights.get(lo);
    }

    private boolean feasible(int n, int[][] edges, int k, int t) {
        int[] parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
        // Keep only edges of weight <= t: the union-find then holds exactly
        // the components left after cutting every heavier edge, and any
        // further removal only increases the count, so t works iff <= k.
        int comps = n;
        for (int[] e : edges) {
            if (e[2] <= t) {
                int ru = find(parent, e[0]);
                int rv = find(parent, e[1]);
                if (ru != rv) {
                    parent[ru] = rv;
                    comps--;
                }
            }
        }
        return comps <= k;
    }

    private int find(int[] parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
}
