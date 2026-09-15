class Solution {

    public int[] sortColors(int[] nums) {
        // Three growing regions and an unexplored tail:
        //   [0, low)    settled 0s
        //   [low, mid)  settled 1s
        //   [mid, high] unexamined
        //   (high, end) settled 2s
        // Each step examines nums[mid] and shrinks the unexamined band.
        int low = 0,
            mid = 0,
            high = nums.length - 1;
        while (mid <= high) {
            int value = nums[mid];
            if (value == 0) {
                // The element swapped in from `low` is a settled 1 (or mid
                // == low, swapping with itself), so mid may advance too.
                int held = nums[low];
                nums[low] = nums[mid];
                nums[mid] = held;
                low++;
                mid++;
            } else if (value == 1) {
                // Already in its home region: the unexamined band alone
                // shrinks.
                mid++;
            } else {
                // The element swapped in from `high` is unexamined, so mid
                // stays put and re-reads it on the next pass.
                int held = nums[mid];
                nums[mid] = nums[high];
                nums[high] = held;
                high--;
            }
        }
        return nums;
    }
}
