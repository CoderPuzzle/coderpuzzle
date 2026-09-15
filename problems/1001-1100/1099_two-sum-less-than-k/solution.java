import java.util.Arrays;

class Solution {

    public int twoSumLessThanK(int[] nums, int k) {
        // Sort, then two pointers: advance lo on small sums, retreat hi on
        // large ones, tracking the largest sum below k.
        Arrays.sort(nums);
        int lo = 0,
            hi = nums.length - 1;
        int best = -1;
        while (lo < hi) {
            int s = nums[lo] + nums[hi];
            if (s < k) {
                if (s > best) best = s;
                ++lo;
            } else {
                --hi;
            }
        }
        return best;
    }
}
