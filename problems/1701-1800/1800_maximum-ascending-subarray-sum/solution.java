class Solution {

    public int maxAscendingSum(int[] nums) {
        // One sweep: cur is the sum of the strictly increasing run
        // ending here; extend it while the values strictly rise,
        // restart at the bare element otherwise (equal neighbours
        // break the run). Every value is positive, so the fullest
        // run ending at each index is its best subarray. n * max
        // <= 10^4 and strict ascent forces distinct values, capping
        // the true maximum at 5050 - far inside int range.
        int best = nums[0],
            cur = nums[0];
        for (int i = 1; i < nums.length; i++) {
            cur = nums[i] > nums[i - 1] ? cur + nums[i] : nums[i];
            best = Math.max(best, cur);
        }
        return best;
    }
}
