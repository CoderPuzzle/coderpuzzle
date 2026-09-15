import java.util.Arrays;

class Solution {

    public int findUnsortedSubarray(int[] nums) {
        // Sort a copy and compare position by position: everything outside
        // the reorder window already sits where the sorted order puts it,
        // so the FIRST and LAST disagreeing positions are the window's edges.
        int[] sorted = nums.clone();
        Arrays.sort(sorted);
        int start = 0;
        while (start < nums.length && nums[start] == sorted[start]) {
            start++;
        }
        if (start == nums.length) {
            return 0;
        }
        int end = nums.length - 1;
        while (nums[end] == sorted[end]) {
            end--;
        }
        return end - start + 1;
    }
}
