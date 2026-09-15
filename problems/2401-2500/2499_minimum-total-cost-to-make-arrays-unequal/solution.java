import java.util.HashMap;
import java.util.Map;

class Solution {

    public long minimumTotalCost(int[] nums1, int[] nums2) {
        // Pay every equal column tentatively and histogram their values;
        // buy the cheapest neutral columns while one value dominates the
        // chosen set. The total reaches n*(n-1)/2 ~ 5e9, hence long.
        long cost = 0;
        Map<Integer, Integer> cnt = new HashMap<>();
        int chosen = 0;
        int dom = Integer.MIN_VALUE;
        for (int i = 0; i < nums1.length; ++i) {
            if (nums1[i] == nums2[i]) {
                int c = cnt.merge(nums1[i], 1, Integer::sum);
                if (cnt.getOrDefault(dom, 0) < c) {
                    dom = nums1[i];
                }
                chosen++;
                cost += i;
            }
        }
        if (chosen == 0) {
            return 0;
        }
        for (int j = 0; j < nums1.length && cnt.get(dom) * 2 > chosen; ++j) {
            if (nums1[j] != nums2[j] && nums1[j] != dom && nums2[j] != dom) {
                chosen++;
                cost += j;
            }
        }
        return cnt.get(dom) * 2 <= chosen ? cost : -1;
    }
}
