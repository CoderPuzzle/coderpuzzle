import java.util.Arrays;

class Solution {

    public int[] rearrangeArray(int[] nums) {
        // Sort, then interleave halves: the larger half occupies the even
        // indices, the smaller half the odd ones. Each even-indexed value
        // is then strictly above both (lower-half) neighbors and each
        // odd-indexed value strictly below both (upper-half) neighbors,
        // so no interior element can equal the average of its neighbors.
        Arrays.sort(nums);
        int n = nums.length;
        int[] ans = new int[n];
        for (int k = 0; k < n - n / 2; ++k) {
            ans[2 * k] = nums[n / 2 + k];
        }
        for (int k = 0; k < n / 2; ++k) {
            ans[2 * k + 1] = nums[k];
        }
        return ans;
    }
}
