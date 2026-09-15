import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

class Solution {

    public int distinctAverages(int[] nums) {
        // Sort, then pair the i-th smallest with the i-th largest. The
        // average (a + b) / 2 is distinct exactly when the sum a + b is
        // distinct, so track pair sums and never touch floats.
        Arrays.sort(nums);
        Set<Integer> sums = new HashSet<>();
        int n = nums.length;
        for (int i = 0; i < n / 2; ++i) {
            sums.add(nums[i] + nums[n - 1 - i]);
        }
        return sums.size();
    }
}
