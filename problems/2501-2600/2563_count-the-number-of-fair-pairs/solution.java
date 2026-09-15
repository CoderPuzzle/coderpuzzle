import java.util.Arrays;

class Solution {

    // Sliding window: once arr[lo] + arr[hi] <= limit, every index between
    // lo and hi pairs with lo as well, worth hi - lo pairs.
    private long countAtMost(int[] arr, long limit) {
        long total = 0;
        int lo = 0,
            hi = arr.length - 1;
        while (lo < hi) {
            if ((long) arr[lo] + arr[hi] <= limit) {
                total += hi - lo;
                lo++;
            } else {
                hi--;
            }
        }
        return total;
    }

    public long countFairPairs(int[] nums, int lower, int upper) {
        // Sorting discards index identity, but fairness only depends on
        // values: counting ordered positions i < j in the sorted array
        // counts each original pair exactly once. Pair sums reach +-2e9
        // and answers reach C(n,2) ~= 5e9, both beyond int, so the whole
        // count runs in 64-bit arithmetic.
        int[] arr = nums.clone();
        Arrays.sort(arr);
        return countAtMost(arr, upper) - countAtMost(arr, (long) lower - 1);
    }
}
