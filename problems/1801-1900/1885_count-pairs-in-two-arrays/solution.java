import java.util.*;

class Solution {

    // d[i] = nums1[i]-nums2[i]; count pairs with d[i]+d[j] > 0 by two
    // pointers over sorted d: d[l]+d[r] > 0 means all of l+1..r-1 also
    // pair with r, so add r-l and move r down.
    public long countPairs(int[] nums1, int[] nums2) {
        int n = nums1.length;
        int[] d = new int[n];
        for (int i = 0; i < n; i++) {
            d[i] = nums1[i] - nums2[i];
        }
        Arrays.sort(d);
        long total = 0;
        int l = 0,
            r = n - 1;
        while (l < r) {
            if (d[l] + d[r] > 0) {
                total += r - l;
                r--;
            } else {
                l++;
            }
        }
        return total;
    }
}
