class Solution {

    public long splitArray(int[] nums) {
        // Sieve of Eratosthenes marks which indices are prime in
        // O(n log log n); a single pass then routes each element to A or B.
        int n = nums.length;
        boolean[] isPrime = new boolean[n];
        java.util.Arrays.fill(isPrime, true);
        if (n > 0) isPrime[0] = false;
        if (n > 1) isPrime[1] = false;
        for (int p = 2; (long) p * p < n; ++p) {
            if (!isPrime[p]) continue;
            for (int multiple = p * p; multiple < n; multiple += p) {
                isPrime[multiple] = false;
            }
        }

        long sumA = 0;
        long sumB = 0;
        for (int index = 0; index < n; ++index) {
            if (isPrime[index]) sumA += nums[index];
            else sumB += nums[index];
        }
        // |sum(A) - sum(B)| can reach ~1e14, so the sums are long, not int.
        return Math.abs(sumA - sumB);
    }
}
