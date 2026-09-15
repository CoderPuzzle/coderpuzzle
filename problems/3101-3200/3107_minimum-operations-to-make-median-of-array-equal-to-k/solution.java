import java.util.Arrays;

class Solution {

    public long minOperationsToMakeMedianK(int[] nums, int k) {
        // After sorting, the median slot is n / 2: the middle element for
        // odd n and the larger of the two middles for even n, matching the
        // statement's definition. Elements left of the slot above k must
        // come down to k; elements right of it below k must come up. The
        // total reaches ~2*10**14 at the constraint maximum, so the count
        // lives in a long.
        Arrays.sort(nums);
        int mid = nums.length / 2;
        long total = Math.abs((long) nums[mid] - k);
        for (int i = 0; i < mid; i++) {
            if (nums[i] > k) {
                total += nums[i] - k;
            }
        }
        for (int i = mid + 1; i < nums.length; i++) {
            if (nums[i] < k) {
                total += (long) k - nums[i];
            }
        }
        return total;
    }
}
