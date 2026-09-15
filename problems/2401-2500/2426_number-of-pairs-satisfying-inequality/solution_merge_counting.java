import java.util.Arrays;

class Solution {

    public long numberOfPairs(int[] nums1, int[] nums2, int diff) {
        int n = nums1.length;
        long[] values = new long[n];
        for (int i = 0; i < n; i++) {
            values[i] = (long) nums1[i] - nums2[i];
        }
        return mergeSort(values, diff, 0, n);
    }

    private long mergeSort(long[] values, long diff, int lo, int hi) {
        if (hi - lo < 2) {
            return 0;
        }
        int mid = (lo + hi) / 2;
        long count = mergeSort(values, diff, lo, mid) + mergeSort(values, diff, mid, hi);
        long[] left = Arrays.copyOfRange(values, lo, mid);
        int p = 0; // left values at or below the running bound
        for (int j = mid; j < hi; j++) {
            while (p < left.length && left[p] <= values[j] + diff) {
                p++;
            }
            count += p; // each admitted left value pairs with this right element
        }
        int i = 0,
            j = mid,
            k = lo;
        while (i < left.length && j < hi) {
            if (left[i] <= values[j]) {
                // equal: the left element places first
                values[k] = left[i];
                i++;
            } else {
                values[k] = values[j];
                j++;
            }
            k++;
        }
        while (i < left.length) {
            values[k] = left[i];
            i++;
            k++;
        }
        return count;
    }
}
