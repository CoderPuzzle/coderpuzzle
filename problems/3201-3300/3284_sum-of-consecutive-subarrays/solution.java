class Solution {

    public int getSum(int[] nums) {
        // Scan maximal constant-step (+1 / -1) runs left to right, carrying
        // ending, the sum of all consecutive subarrays that end at the
        // current index. Repeating the direction grows the run and extends
        // every such subarray (ending += chain * x after the increment); a
        // unit step in a new direction keeps only the fresh pair plus [x];
        // any other step keeps only [x]. Reduced mod 10^9 + 7 each step,
        // so the widest intermediate is chain * x <= 10^10, within long.
        final long MOD = 1_000_000_007L;
        long total = nums[0];
        int chain = 1;
        long ending = nums[0];
        int direction = 0;
        for (int i = 1; i < nums.length; i++) {
            int d = nums[i] - nums[i - 1];
            if (d == direction && d != 0) {
                chain++;
                ending = (ending + (long) chain * nums[i]) % MOD;
            } else if (d == 1 || d == -1) {
                direction = d;
                chain = 2;
                ending = (nums[i - 1] + 2L * nums[i]) % MOD;
            } else {
                direction = 0;
                chain = 1;
                ending = nums[i];
            }
            total = (total + ending) % MOD;
        }
        return (int) total;
    }
}
