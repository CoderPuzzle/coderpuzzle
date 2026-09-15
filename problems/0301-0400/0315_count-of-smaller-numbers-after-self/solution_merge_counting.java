import java.util.Arrays;

class Solution {

    public int[] countSmaller(int[] nums) {
        int n = nums.length;
        int[] result = new int[n]; // per index: strictly smaller values to its right
        int[] order = new int[n]; // merge-sort workspace of indexes, ordered by value
        for (int i = 0; i < n; i++) {
            order[i] = i;
        }
        mergeSort(nums, order, result, 0, n);
        return result;
    }

    private void mergeSort(int[] nums, int[] order, int[] result, int lo, int hi) {
        if (hi - lo < 2) {
            return;
        }
        int mid = (lo + hi) / 2;
        mergeSort(nums, order, result, lo, mid);
        mergeSort(nums, order, result, mid, hi);
        int[] left = Arrays.copyOfRange(order, lo, mid);
        int i = 0,
            j = mid,
            k = lo;
        while (i < left.length && j < hi) {
            if (nums[left[i]] <= nums[order[j]]) {
                // equal: the left element places first, uncounted
                result[left[i]] += j - mid; // right-half values already placed below it
                order[k] = left[i];
                i++;
            } else {
                order[k] = order[j];
                j++;
            }
            k++;
        }
        while (i < left.length) {
            result[left[i]] += j - mid; // the whole right half sits below it
            order[k] = left[i];
            i++;
            k++;
        }
    }
}
