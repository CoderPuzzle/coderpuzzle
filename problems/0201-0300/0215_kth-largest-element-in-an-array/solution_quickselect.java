import java.util.Random;

class Solution {

    public int findKthLargest(int[] nums, int k) {
        // The kth largest sits at index n - k of the ascending-sorted
        // array; quickselect homes in on that target index.
        int target = nums.length - k;
        int lo = 0,
            hi = nums.length - 1;
        Random random = new Random();
        while (lo < hi) {
            // A uniformly random pivot defeats adversarial inputs: every
            // partition is expected to shrink the range by a constant
            // factor, so the total work stays linear instead of
            // degrading to quadratic on sorted or all-equal arrays.
            int r = lo + random.nextInt(hi - lo + 1);
            int tmp = nums[r];
            nums[r] = nums[hi];
            nums[hi] = tmp;
            int pivot = nums[hi];
            int store = lo;
            // Lomuto sweep: values strictly below the pivot land left of
            // `store`; duplicates ride the right side.
            for (int j = lo; j < hi; j++) {
                if (nums[j] < pivot) {
                    tmp = nums[j];
                    nums[j] = nums[store];
                    nums[store] = tmp;
                    store++;
                }
            }
            tmp = nums[store];
            nums[store] = nums[hi];
            nums[hi] = tmp;
            // nums[store] is now in its final sorted position; keep only
            // the side that still contains the target index.
            if (store == target) return nums[store];
            if (store < target) lo = store + 1;
            else hi = store - 1;
        }
        return nums[target];
    }
}
