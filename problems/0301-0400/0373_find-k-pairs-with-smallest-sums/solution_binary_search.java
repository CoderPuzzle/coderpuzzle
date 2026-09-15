import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[][] kSmallestPairs(int[] nums1, int[] nums2, int k) {
        // The k-th smallest sum is the least s with countAtMost(s) >= k.
        long lo = (long) nums1[0] + nums2[0];
        long hi = (long) nums1[nums1.length - 1] + nums2[nums2.length - 1];
        while (lo < hi) {
            long mid = lo + (hi - lo) / 2;
            if (countAtMost(nums1, nums2, mid) >= k) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        long threshold = lo;
        // Every pair strictly below the threshold makes the cut — there are
        // fewer than k of them by the minimality of the threshold.
        List<long[]> below = new ArrayList<>();
        int j = nums2.length - 1;
        for (int i = 0; i < nums1.length; i++) {
            while (j >= 0 && (long) nums1[i] + nums2[j] >= threshold) {
                j--;
            }
            for (int jj = 0; jj <= j; jj++) {
                below.add(new long[] { (long) nums1[i] + nums2[jj], i, jj });
            }
        }
        below.sort((a, b) -> {
            if (a[0] != b[0]) return Long.compare(a[0], b[0]);
            if (a[1] != b[1]) return Long.compare(a[1], b[1]);
            return Long.compare(a[2], b[2]);
        });
        List<int[]> pairs = new ArrayList<>();
        for (long[] e : below) {
            pairs.add(new int[] { nums1[(int) e[1]], nums2[(int) e[2]] });
        }
        // Top up with pairs exactly at the threshold, in (i, j) order —
        // the required tie-break among equal sums.
        int needed = k - pairs.size();
        for (int i = 0; i < nums1.length && needed > 0; i++) {
            long target = threshold - nums1[i];
            int loJ = lowerBound(nums2, target);
            int hiJ = lowerBound(nums2, target + 1);
            for (int jj = loJ; jj < hiJ && needed > 0; jj++) {
                pairs.add(new int[] { nums1[i], nums2[jj] });
                needed--;
            }
        }
        int[][] result = new int[pairs.size()][];
        for (int i = 0; i < result.length; i++) {
            result[i] = pairs.get(i);
        }
        return result;
    }

    // How many pairs sum to at most s? Both arrays are sorted, so a
    // descending pointer into nums2 serves every nums1[i]: the bound
    // s - nums1[i] only falls as i rises, so the pointer never turns back.
    private long countAtMost(int[] nums1, int[] nums2, long s) {
        long total = 0;
        int j = nums2.length - 1;
        for (int a : nums1) {
            long bound = s - a;
            while (j >= 0 && nums2[j] > bound) {
                j--;
            }
            total += j + 1;
        }
        return total;
    }

    private int lowerBound(int[] values, long target) {
        int lo = 0,
            hi = values.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (values[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}
