class Solution {

    public int compareBitonicSums(int[] nums) {
        long total = 0;
        long ascending = 0;
        int peak = nums[0];
        for (int index = 0; index < nums.length; index++) {
            total += nums[index];
            if (index == 0 || nums[index] > nums[index - 1]) ascending += nums[index];
            peak = Math.max(peak, nums[index]);
        }
        long descending = total - ascending + peak;
        if (ascending > descending) return 0;
        if (descending > ascending) return 1;
        return -1;
    }
}
