import java.util.Arrays;

class Solution {

    public int countComponents(int[] nums, int threshold) {
        // Every edge needs lcm(nums[i], nums[j]) <= threshold, and the
        // lcm is a multiple of both values, so values above the
        // threshold are isolated singletons. Enumerate present values
        // ascending, keeping anchor[m] = the smallest present divisor
        // of each multiple m: every later present divisor of m unions
        // with it, and since both divide m the edge is genuine
        // (lcm | m <= threshold). Every genuine edge (a, b) is covered
        // at m = lcm(a, b). The scans cost the harmonic sum
        // ~threshold*ln(threshold). Iterative DSU with path halving
        // and union by size; values up to 1e9 are never multiplied and
        // the answer fits 32 bits.
        int n = nums.length;
        int[] parent = new int[n];
        int[] size = new int[n];
        for (int i = 0; i < n; ++i) {
            parent[i] = i;
            size[i] = 1;
        }
        int[] present = new int[threshold + 1];
        Arrays.fill(present, -1);
        for (int i = 0; i < n; ++i) {
            if (nums[i] <= threshold) present[nums[i]] = i;
        }
        int[] anchor = new int[threshold + 1];
        Arrays.fill(anchor, -1);
        for (int v = 1; v <= threshold; ++v) {
            int i = present[v];
            if (i < 0) continue;
            if (anchor[v] >= 0) union(i, anchor[v], parent, size);
            for (int m = 2 * v; m <= threshold; m += v) {
                if (anchor[m] >= 0) {
                    union(i, anchor[m], parent, size);
                } else {
                    anchor[m] = i;
                }
            }
        }
        int comps = 0;
        for (int i = 0; i < n; ++i) {
            if (find(i, parent) == i) ++comps;
        }
        return comps;
    }

    private int find(int x, int[] parent) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    private void union(int a, int b, int[] parent, int[] size) {
        int ra = find(a, parent);
        int rb = find(b, parent);
        if (ra == rb) return;
        if (size[ra] < size[rb]) {
            int t = ra;
            ra = rb;
            rb = t;
        }
        parent[rb] = ra;
        size[ra] += size[rb];
    }
}
