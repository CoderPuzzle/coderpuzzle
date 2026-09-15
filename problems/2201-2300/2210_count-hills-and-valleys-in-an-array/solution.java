import java.util.ArrayList;
import java.util.List;

class Solution {

    public int countHillValley(int[] nums) {
        // A whole run of equal neighbors shares one pair of closest
        // non-equal neighbors, so collapsing each maximal run of equal
        // values to a single representative turns "count hills and
        // valleys, once per run" into "count interior local extrema" of
        // the compressed sequence. The endpoints of the compressed
        // sequence are missing a non-equal neighbor on one side, which
        // the interior-only loop encodes exactly.
        List<Integer> compressed = new ArrayList<>();
        compressed.add(nums[0]);
        for (int i = 1; i < nums.length; ++i) {
            if (nums[i] != compressed.get(compressed.size() - 1)) {
                compressed.add(nums[i]);
            }
        }
        int count = 0;
        for (int i = 1; i < compressed.size() - 1; ++i) {
            int left = compressed.get(i - 1),
                mid = compressed.get(i),
                right = compressed.get(i + 1);
            if ((mid > left && mid > right) || (mid < left && mid < right)) {
                count++;
            }
        }
        return count;
    }
}
