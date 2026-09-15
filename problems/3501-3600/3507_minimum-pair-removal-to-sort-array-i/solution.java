import java.util.Arrays;

class Solution {

    public int minimumPairRemoval(int[] nums) {
        // The operation is forced: merge the minimum-sum adjacent pair,
        // leftmost on ties, until the array is non-decreasing. Just
        // simulate -- with n <= 50 a full rescan per step is trivial.
        int[] arr = Arrays.copyOf(nums, nums.length);
        int n = arr.length;
        int ops = 0;
        while (true) {
            boolean sorted = true;
            for (int i = 1; i < n; ++i) {
                if (arr[i - 1] > arr[i]) {
                    sorted = false;
                    break;
                }
            }
            if (sorted) {
                return ops;
            }
            int best = 0;
            for (int i = 1; i + 1 < n; ++i) {
                if (arr[i] + arr[i + 1] < arr[best] + arr[best + 1]) {
                    best = i;
                }
            }
            // strict < keeps the earliest of equal-sum pairs
            arr[best] += arr[best + 1];
            System.arraycopy(arr, best + 2, arr, best + 1, n - best - 2);
            --n;
            ++ops;
        }
    }
}
