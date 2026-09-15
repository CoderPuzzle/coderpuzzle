import java.util.Arrays;

class Solution {

    public int[] countSmallerOppositeParity(int[] nums) {
        int n = nums.length;
        int[] result = new int[n]; // per index: smaller opposite-parity values to its right
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
        int[] placed = new int[2]; // placed right-half values, split by parity
        int i = 0,
            j = mid,
            k = lo;
        while (i < left.length && j < hi) {
            if (nums[left[i]] <= nums[order[j]]) {
                // equal: the left element places first, uncounted
                result[left[i]] += placed[(nums[left[i]] & 1) ^ 1]; // opposite parity only
                order[k] = left[i];
                i++;
            } else {
                placed[nums[order[j]] & 1]++;
                order[k] = order[j];
                j++;
            }
            k++;
        }
        while (i < left.length) {
            // every placed right-half value sits below the remaining left run
            result[left[i]] += placed[(nums[left[i]] & 1) ^ 1];
            order[k] = left[i];
            i++;
            k++;
        }
    }
}
