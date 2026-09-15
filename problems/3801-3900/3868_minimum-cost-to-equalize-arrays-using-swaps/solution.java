import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

class Solution {

    public int minCost(int[] nums1, int[] nums2) {
        // Within-array swaps are free, so only the frequency of each value
        // in each array matters. Both arrays must end with the same
        // multiset: value v appears (cnt1[v] + cnt2[v]) / 2 times in each,
        // which is possible only when that combined count is even. Every
        // count is at most n <= 8e4, so int arithmetic never overflows.
        Map<Integer, Integer> cnt1 = new HashMap<>();
        Map<Integer, Integer> cnt2 = new HashMap<>();
        Set<Integer> values = new HashSet<>();
        for (int v : nums1) {
            cnt1.merge(v, 1, Integer::sum);
            values.add(v);
        }
        for (int v : nums2) {
            cnt2.merge(v, 1, Integer::sum);
            values.add(v);
        }
        int totalDiff = 0;
        for (int v : values) {
            int a = cnt1.getOrDefault(v, 0);
            int b = cnt2.getOrDefault(v, 0);
            if ((a + b) % 2 == 1) {
                return -1;
            }
            totalDiff += Math.abs(a - b);
        }
        // Each cross swap moves one surplus element out of nums1 and one out
        // of nums2, fixing two placements at once. The surplus in nums1 is
        // half the positive differences, which is a quarter of the sum of
        // all differences because the two arrays are equally large.
        return totalDiff / 4;
    }
}
