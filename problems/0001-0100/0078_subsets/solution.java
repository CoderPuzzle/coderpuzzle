import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int[][] subsets(int[] nums) {
        int n = nums.length;
        List<int[]> subsets = new ArrayList<>();
        // Count masks upward from all bits clear ([]) to all bits set (the
        // whole array): bit i set means nums[i] is in the subset.
        for (int mask = 0; mask < 1 << n; mask++) {
            int[] current = new int[n];
            int size = 0;
            for (int i = 0; i < n; i++) {
                // Bit i set: nums[i] joins, in input order within the subset.
                if ((mask & (1 << i)) != 0) {
                    current[size++] = nums[i];
                }
            }
            // Copy: current carries slack for the branches not taken.
            subsets.add(Arrays.copyOf(current, size));
        }
        return subsets.toArray(new int[0][]);
    }
}
