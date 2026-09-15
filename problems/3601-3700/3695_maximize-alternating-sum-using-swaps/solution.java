import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public long maxAlternatingSum(int[] nums, int[][] swaps) {
        // A pair lets its two indices trade values any number of times, so
        // each connected component of the swap graph rearranges freely:
        // merge the pair's endpoints with a union-find.
        int n = nums.length;
        int[] parent = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
        int[] sz = new int[n];
        Arrays.fill(sz, 1);
        for (int[] pair : swaps) {
            int rp = find(parent, pair[0]);
            int rq = find(parent, pair[1]);
            if (rp == rq) {
                continue;
            }
            if (sz[rp] < sz[rq]) {
                int tmp = rp;
                rp = rq;
                rq = tmp;
            }
            parent[rq] = rp;
            sz[rp] += sz[rq];
        }

        // Collect each component's values and count its even-index slots.
        Map<Integer, List<Integer>> groups = new HashMap<>();
        Map<Integer, Integer> evens = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int r = find(parent, i);
            groups.computeIfAbsent(r, k -> new ArrayList<>()).add(nums[i]);
            if (i % 2 == 0) {
                evens.merge(r, 1, Integer::sum);
            }
        }

        // With E even slots in a component, placing its E largest values on
        // them contributes 2*sumTopE - sumAll; totals reach ~1e14, hence
        // long throughout.
        long ans = 0;
        for (Map.Entry<Integer, List<Integer>> entry : groups.entrySet()) {
            List<Integer> vals = entry.getValue();
            vals.sort(Comparator.reverseOrder());
            int e = evens.getOrDefault(entry.getKey(), 0);
            long topE = 0,
                all = 0;
            for (int j = 0; j < vals.size(); j++) {
                long v = vals.get(j);
                all += v;
                if (j < e) {
                    topE += v;
                }
            }
            ans += 2 * topE - all;
        }
        return ans;
    }

    // Two-pass path compression keeps every later find near O(1).
    private int find(int[] parent, int x) {
        int root = x;
        while (parent[root] != root) {
            root = parent[root];
        }
        while (parent[x] != root) {
            int up = parent[x];
            parent[x] = root;
            x = up;
        }
        return root;
    }
}
