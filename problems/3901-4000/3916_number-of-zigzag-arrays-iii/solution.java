class Solution {

    private static final long MOD = 1_000_000_007L;

    public int zigZagArrays(int n, int l, int r) {
        int points = n + 1;
        long[] values = new long[points + 1];
        for (int width = 2; width <= points; width++) {
            long[] up = new long[width];
            long[] down = new long[width];
            for (int value = 0; value < width; value++) {
                up[value] = value;
                down[value] = width - 1 - value;
            }
            for (int length = 3; length <= n; length++) {
                long[] nextUp = new long[width];
                long running = 0;
                for (int value = 0; value < width; value++) {
                    nextUp[value] = running;
                    running = (running + down[value]) % MOD;
                }
                long[] nextDown = new long[width];
                running = 0;
                for (int value = width - 1; value >= 0; value--) {
                    nextDown[value] = running;
                    running = (running + up[value]) % MOD;
                }
                up = nextUp;
                down = nextDown;
            }
            for (int value = 0; value < width; value++) values[width] = (values[width] + up[value] + down[value]) % MOD;
        }
        int width = r - l + 1;
        if (width <= points) return (int) values[width];
        long[] factorial = new long[points + 1];
        long[] inverseFactorial = new long[points + 1];
        factorial[0] = 1;
        for (int value = 1; value <= points; value++) factorial[value] = (factorial[value - 1] * value) % MOD;
        inverseFactorial[points] = power(factorial[points], MOD - 2);
        for (int value = points; value > 0; value--) inverseFactorial[value - 1] =
            (inverseFactorial[value] * value) % MOD;
        long[] prefix = new long[points + 2];
        long[] suffix = new long[points + 2];
        prefix[0] = suffix[points + 1] = 1;
        for (int value = 1; value <= points; value++) prefix[value] = (prefix[value - 1] * (width - value)) % MOD;
        for (int value = points; value > 0; value--) suffix[value] = (suffix[value + 1] * (width - value)) % MOD;
        long answer = 0;
        for (int value = 1; value <= points; value++) {
            long term = (((values[value] * prefix[value - 1]) % MOD) * suffix[value + 1]) % MOD;
            term = (((term * inverseFactorial[value - 1]) % MOD) * inverseFactorial[points - value]) % MOD;
            answer = (points - value) % 2 == 0 ? answer + term : answer - term;
        }
        return (int) (((answer % MOD) + MOD) % MOD);
    }

    private long power(long base, long exponent) {
        long result = 1;
        while (exponent > 0) {
            if ((exponent & 1) == 1) result = (result * base) % MOD;
            base = (base * base) % MOD;
            exponent >>= 1;
        }
        return result;
    }
}
