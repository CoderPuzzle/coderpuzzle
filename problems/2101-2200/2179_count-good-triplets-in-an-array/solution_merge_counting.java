import java.util.Arrays;

class Solution {

    public long goodTriplets(int[] nums1, int[] nums2) {
        int n = nums1.length;
        int[] pos2 = new int[n];
        for (int i = 0; i < n; i++) {
            pos2[nums2[i]] = i;
        }
        int[] a = new int[n]; // a[i] = position of nums1[i] in nums2
        for (int i = 0; i < n; i++) {
            a[i] = pos2[nums1[i]];
        }

        int[] smallerAfter = new int[n]; // per index: later nums1 values that precede it in nums2
        int[] order = new int[n]; // merge-sort workspace of indexes, ordered by nums2 position
        for (int i = 0; i < n; i++) {
            order[i] = i;
        }
        mergeSort(a, order, smallerAfter, 0, n);

        long answer = 0;
        for (int i = 0; i < n; i++) {
            long left = a[i] - smallerAfter[i]; // values before value in nums1 and in nums2
            // values after value in both arrays
            long right = (long) (n - 1 - i) - smallerAfter[i];
            answer += left * right;
        }
        return answer;
    }

    private void mergeSort(int[] a, int[] order, int[] smallerAfter, int lo, int hi) {
        if (hi - lo < 2) {
            return;
        }
        int mid = (lo + hi) / 2;
        mergeSort(a, order, smallerAfter, lo, mid);
        mergeSort(a, order, smallerAfter, mid, hi);
        int[] left = Arrays.copyOfRange(order, lo, mid);
        int i = 0,
            j = mid,
            k = lo;
        while (i < left.length && j < hi) {
            if (a[left[i]] < a[order[j]]) {
                smallerAfter[left[i]] += j - mid; // right-half values already placed below it
                order[k] = left[i];
                i++;
            } else {
                order[k] = order[j];
                j++;
            }
            k++;
        }
        while (i < left.length) {
            smallerAfter[left[i]] += j - mid; // the whole right half sits below it
            order[k] = left[i];
            i++;
            k++;
        }
    }
}
