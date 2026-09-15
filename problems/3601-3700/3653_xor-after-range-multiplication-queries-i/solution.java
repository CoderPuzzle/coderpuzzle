class Solution {

    private static final long MOD = 1_000_000_007L;

    public int xorAfterQueries(int[] nums, int[][] queries) {
        // Fold every query into a scratch copy held in long cells: walk
        // the indices l, l + k, ... up to r, multiplying each visited
        // element modulo the prime. At most n positions per query keep
        // the total work at n * q.
        long[] values = new long[nums.length];
        for (int i = 0; i < nums.length; i++) {
            values[i] = nums[i];
        }
        for (int[] query : queries) {
            int l = query[0],
                r = query[1],
                k = query[2];
            for (int idx = l; idx <= r; idx += k) {
                // The product reaches ~10^14 before the first fold, so
                // the arithmetic stays in long even though results fit
                // int.
                values[idx] = (values[idx] * query[3]) % MOD;
            }
        }
        // Every element ends below 2^30, so the XOR fits in an int.
        int result = 0;
        for (long value : values) {
            result ^= (int) value;
        }
        return result;
    }
}
