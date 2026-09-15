import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int[][] divideArray(int[] nums, int k) {
        // Sorting is forced: the global minimum may only share a group with
        // the two values closest above it, and inductively every valid
        // division groups consecutive sorted values — so sort and check
        // each consecutive triple's spread (last minus first is the
        // widest).
        Arrays.sort(nums);
        int[][] result = new int[nums.length / 3][];
        for (int i = 0; i + 2 < nums.length; i += 3) {
            if (nums[i + 2] - nums[i] > k) {
                return new int[][] {};
            }
            result[i / 3] = new int[] { nums[i], nums[i + 1], nums[i + 2] };
        }
        return result;
    }
}
