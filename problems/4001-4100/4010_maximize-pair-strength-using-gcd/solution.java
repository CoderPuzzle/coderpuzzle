class Solution {

    public long maxPairStrength(int[] nums) {
        // Fewer than two million pairs at n <= 2000, so every distinct
        // index pair is tried directly: g = gcd(a, b), strength =
        // a * b / g^2. The division is exact because g divides both
        // factors, and equal values collapse to 1, which is why [3,3]
        // scores 1. Widen to long before multiplying: two coprime values
        // near the bound reach just under 1e10, past what an int holds.
        long best = 0;
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                long g = gcd(nums[i], nums[j]);
                long s = ((long) nums[i] * nums[j]) / (g * g);
                if (s > best) {
                    best = s;
                }
            }
        }
        return best;
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
