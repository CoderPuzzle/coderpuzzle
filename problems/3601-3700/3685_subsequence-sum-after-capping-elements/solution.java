class Solution {

    public boolean[] subsequenceSumAfterCapping(int[] nums, int k) {
        int n = nums.length;
        int words = (k + 64) / 64;
        long[] reach = new long[words];
        long[] shifted = new long[words];
        reach[0] = 1L;
        int[] counts = new int[n + 1];
        for (int value : nums) {
            counts[value]++;
        }
        boolean[] answer = new boolean[n];
        int leq = 0;
        for (int x = 1; x <= n; x++) {
            for (int c = 0; c < counts[x]; c++) {
                foldIn(reach, shifted, x);
            }
            leq += counts[x];
            int above = n - leq;
            boolean found = false;
            for (int m = 0, r = k; m <= above && r >= 0; m++, r -= x) {
                if (((reach[r >>> 6] >>> (r & 63)) & 1L) != 0L) {
                    found = true;
                    break;
                }
            }
            answer[x - 1] = found;
        }
        return answer;
    }

    private void foldIn(long[] reach, long[] shifted, int x) {
        int wordShift = x >>> 6;
        int bitShift = x & 63;
        for (int i = 0; i < shifted.length; i++) {
            int src = i - wordShift;
            long value = 0L;
            if (src >= 0) {
                value = reach[src] << bitShift;
                if (bitShift != 0 && src >= 1) {
                    value |= reach[src - 1] >>> (64 - bitShift);
                }
            }
            shifted[i] = value;
        }
        for (int i = 0; i < shifted.length; i++) {
            reach[i] |= shifted[i];
        }
    }
}
