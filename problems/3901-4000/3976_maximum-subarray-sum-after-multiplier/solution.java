class Solution {

    public long maxSubarraySum(int[] nums, int k) {
        long NEG = Long.MIN_VALUE / 4;
        long none = NEG;
        long multiply = NEG;
        long divide = NEG;
        long done = NEG;
        long answer = NEG;
        for (int value : nums) {
            long multiplied = (long) value * k;
            long divided = value / k;
            long prevNone = none;
            long prevMultiply = multiply;
            long prevDivide = divide;
            long prevDone = done;
            none = Math.max(value, prevNone + value);
            multiply = Math.max(multiplied, Math.max(prevNone + multiplied, prevMultiply + multiplied));
            divide = Math.max(divided, Math.max(prevNone + divided, prevDivide + divided));
            done = Math.max(prevMultiply + value, Math.max(prevDivide + value, prevDone + value));
            answer = Math.max(answer, Math.max(none, Math.max(multiply, Math.max(divide, done))));
        }
        return answer;
    }
}
