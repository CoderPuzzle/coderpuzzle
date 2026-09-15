import java.util.Arrays;

class Solution {

    public int[] removeDuplicates(int[] nums) {
        // Sorted order puts every duplicate run adjacent, so one forward
        // scan can compact the array in place: write marks the end of the
        // at-most-twice prefix, and the first two elements are always kept.
        if (nums.length <= 2) {
            return nums;
        }
        int write = 2;
        for (int read = 2; read < nums.length; read++) {
            // nums[write - 2] is the value two slots back in the kept
            // prefix; it equals nums[read] only when that value already
            // holds both of its allowed copies.
            if (nums[read] != nums[write - 2]) {
                nums[write] = nums[read];
                write++;
            }
        }
        // The statement frees the tail beyond the kept prefix, so the
        // compacted prefix is the whole judged answer; its length is k.
        return Arrays.copyOf(nums, write);
    }
}
