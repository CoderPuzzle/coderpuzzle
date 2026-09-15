import java.util.Arrays;

class Solution {

    public boolean isMajorityElement(int[] nums, int target) {
        // Sorted array: the target's occurrences form one contiguous run,
        // whose length is the distance between the two search boundaries.
        int low = Arrays.binarySearch(nums, target);
        if (low < 0) return false; // target absent: search returns -(insertion)-1
        while (low > 0 && nums[low - 1] == target) --low;
        int high = low;
        while (high < nums.length && nums[high] == target) ++high;
        return 2 * (high - low) > nums.length;
    }
}
