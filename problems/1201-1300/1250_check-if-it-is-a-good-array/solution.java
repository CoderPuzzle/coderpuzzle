class Solution {

    public boolean isGoodArray(int[] nums) {
        // Bézout: the reachable sums are exactly the multiples of the gcd,
        // so a sum of 1 exists iff the overall gcd is 1.
        long overall = 0;
        for (int value : nums) {
            overall = gcd(overall, value);
            if (overall == 1) return true;
        }
        return overall == 1;
    }

    private long gcd(long a, long b) {
        while (b != 0) {
            long t = a % b;
            a = b;
            b = t;
        }
        return a;
    }
}
