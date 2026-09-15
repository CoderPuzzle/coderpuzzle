class Solution {

    public int[] applyOperations(int[] nums) {
        // Phase 1: apply the n-1 operations left to right; doubling an
        // element zeroes its right neighbor, which the next comparison sees.
        int[] result = nums.clone();
        for (int i = 0; i + 1 < result.length; ++i) {
            if (result[i] == result[i + 1]) {
                result[i] *= 2;
                result[i + 1] = 0;
            }
        }
        // Phase 2: stable-compact non-zero values to the front, then pad.
        int write = 0;
        for (int read = 0; read < result.length; ++read) {
            if (result[read] != 0) result[write++] = result[read];
        }
        while (write < result.length) result[write++] = 0;
        return result;
    }
}
