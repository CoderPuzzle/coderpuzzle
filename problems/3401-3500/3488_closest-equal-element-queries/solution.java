import java.util.*;

class Solution {

    // Group indices by value; each occurrence list is sorted. Per query,
    // binary-search the list and take the nearer of the two circular
    // neighbors.
    public int[] solveQueries(int[] nums, int[] queries) {
        Map<Integer, List<Integer>> pos = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            pos.computeIfAbsent(nums[i], k -> new ArrayList<>()).add(i);
        }
        int n = nums.length;
        int[] ans = new int[queries.length];
        for (int t = 0; t < queries.length; t++) {
            int q = queries[t];
            List<Integer> p = pos.get(nums[q]);
            if (p.size() == 1) {
                ans[t] = -1;
                continue;
            }
            int k = Collections.binarySearch(p, q);
            int prev = k > 0 ? p.get(k - 1) : p.get(p.size() - 1);
            int nxt = k + 1 < p.size() ? p.get(k + 1) : p.get(0);
            int dprev = (q - prev + n) % n;
            int dnxt = (nxt - q + n) % n;
            ans[t] = Math.min(dprev, dnxt);
        }
        return ans;
    }
}
