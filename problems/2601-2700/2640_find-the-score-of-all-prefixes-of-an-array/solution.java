class Solution {

    public long[] findPrefixScore(int[] nums) {
        // ans is the prefix sum of the conversion array, so one fused pass
        // keeps a running max and a running total, never storing conver
        // itself. Conversion values reach 2*10^9 and totals 2*10^14, both
        // past int range, so everything runs in long.
        long[] result = new long[nums.length];
        long runningMax = 0;
        long total = 0;
        for (int i = 0; i < nums.length; ++i) {
            long value = nums[i];
            if (value > runningMax) {
                runningMax = value;
            }
            total += value + runningMax;
            result[i] = total;
        }
        return result;
    }
}
