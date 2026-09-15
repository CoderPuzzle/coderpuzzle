import java.util.Random;

class Solution {

    public int countElements(int[] nums, int k) {
        // The full sorted order is more than the answer needs: the count
        // is decided entirely by which values sit strictly below
        // sorted[n - k - 1]. Quickselect learns that one threshold value
        // without paying to order everything else.
        int target = nums.length - k - 1;
        int lo = 0,
            hi = nums.length - 1;
        Random random = new Random();
        while (lo < hi) {
            // A uniformly random pivot defeats adversarial inputs: every
            // partition is expected to shrink the window by a constant
            // factor, so the total work stays linear instead of degrading
            // to quadratic on sorted arrays.
            int r = lo + random.nextInt(hi - lo + 1);
            int tmp = nums[r];
            nums[r] = nums[hi];
            nums[hi] = tmp;
            int pivot = nums[hi];
            // Three-way (Dutch flag) split: values strictly below the
            // pivot move to the front block, values strictly above to the
            // back block, and the pivot's own run sits between them. A
            // run of equals leaves the window together, which is what
            // keeps heavily duplicated inputs fast.
            int lt = lo,
                i = lo,
                gt = hi;
            while (i <= gt) {
                if (nums[i] < pivot) {
                    tmp = nums[lt];
                    nums[lt] = nums[i];
                    nums[i] = tmp;
                    lt++;
                    i++;
                } else if (nums[i] > pivot) {
                    tmp = nums[i];
                    nums[i] = nums[gt];
                    nums[gt] = tmp;
                    gt--;
                } else {
                    i++;
                }
            }
            // [lo, lt-1] < pivot, [lt, gt] == pivot, [gt+1, hi] > pivot;
            // keep only the block still covering the target index.
            if (target < lt) hi = lt - 1;
            else if (target > gt) lo = gt + 1;
            else break;
        }
        int threshold = nums[target];
        // Elements strictly below the threshold qualify wholesale; the run
        // AT it qualifies only when its strictly-greater count reaches k.
        int less = 0,
            equal = 0;
        for (int value : nums) {
            if (value < threshold) less++;
            else if (value == threshold) equal++;
        }
        return nums.length - less - equal >= k ? less + equal : less;
    }
}
