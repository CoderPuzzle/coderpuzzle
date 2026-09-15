class Solution {

    public int sumOfFlooredPairs(int[] nums) {
        final long MOD = 1_000_000_007L;
        if (nums.length == 0) {
            return 0;
        }
        int maxVal = 0;
        for (int v : nums) {
            maxVal = Math.max(maxVal, v);
        }
        long[] count = new long[maxVal + 1];
        for (int v : nums) {
            count[v]++;
        }
        long[] prefix = new long[maxVal + 1];
        long running = 0;
        for (int v = 0; v <= maxVal; v++) {
            running += count[v];
            prefix[v] = running;
        }
        long total = 0;
        for (int y = 1; y <= maxVal; y++) {
            if (count[y] == 0) {
                continue;
            }
            // sum over x of floor(x / y) * count[x]
            // = sum over m >= 1 of #{x : x >= m * y}
            long c = 0;
            for (int m = y; m <= maxVal; m += y) {
                c += prefix[maxVal] - prefix[m - 1];
            }
            total = (total + count[y] * c) % MOD;
        }
        return (int) total;
    }
}
