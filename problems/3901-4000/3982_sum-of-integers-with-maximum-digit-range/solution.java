class Solution {

    public long maxDigitRange(int[] nums) {
        int[] ranges = new int[nums.length];
        int maximum = 0;
        for (int i = 0; i < nums.length; i++) {
            int remaining = nums[i];
            int low = 9;
            int high = 0;
            while (remaining > 0) {
                int digit = remaining % 10;
                low = Math.min(low, digit);
                high = Math.max(high, digit);
                remaining /= 10;
            }
            ranges[i] = high - low;
            maximum = Math.max(maximum, ranges[i]);
        }
        long answer = 0;
        for (int i = 0; i < nums.length; i++) {
            if (ranges[i] == maximum) answer += nums[i];
        }
        return answer;
    }
}
