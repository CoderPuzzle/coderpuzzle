class Solution {

    public int sumOfPrimesInRange(int n) {
        int limit = 1000;
        boolean[] isPrime = new boolean[limit + 1];
        java.util.Arrays.fill(isPrime, true);
        isPrime[0] = isPrime[1] = false;
        for (int p = 2; p * p <= limit; p++) {
            if (isPrime[p]) {
                for (int multiple = p * p; multiple <= limit; multiple += p) {
                    isPrime[multiple] = false;
                }
            }
        }

        int[] prefix = new int[limit + 1];
        for (int value = 1; value <= limit; value++) {
            prefix[value] = prefix[value - 1] + (isPrime[value] ? value : 0);
        }

        int reverse = 0;
        int remaining = n;
        while (remaining > 0) {
            reverse = reverse * 10 + (remaining % 10);
            remaining /= 10;
        }

        return prefix[Math.max(n, reverse)] - prefix[Math.min(n, reverse) - 1];
    }
}
