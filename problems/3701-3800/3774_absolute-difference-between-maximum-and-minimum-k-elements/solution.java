import java.util.Arrays;

class Solution {

    public int absDifference(int[] nums, int k) {
        // Sorted ascending, the k smallest elements occupy the first k
        // slots and the k largest the last k; all values are positive, so
        // the larger sum always comes from the top end and the absolute
        // difference is just last k minus first k.
        Arrays.sort(nums);
        int small = 0;
        int large = 0;
        for (int i = 0; i < k; i++) {
            small += nums[i];
            large += nums[nums.length - k + i];
        }
        return large - small;
    }
}
