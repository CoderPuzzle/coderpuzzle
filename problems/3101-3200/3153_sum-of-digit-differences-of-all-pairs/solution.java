class Solution {

    public long sumDigitDifferences(int[] nums) {
        long total = 0;
        for (int place = 1; nums[0] / place > 0; place *= 10) {
            long[] counts = new long[10];
            for (int num : nums) {
                counts[(num / place) % 10]++;
            }
            long pairs = 0;
            for (long count : counts) {
                pairs += count * (nums.length - count);
            }
            total += pairs / 2;
        }
        return total;
    }
}
