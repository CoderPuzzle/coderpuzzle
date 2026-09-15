class Solution {

    public double getProbability(int[] balls) {
        int total = 0;
        for (int count : balls) {
            total += count;
        }
        int half = total / 2;
        long denominator = binomial(total, half);
        long numerator = walk(balls, 0, half, 0, 0);
        return (double) numerator / (double) denominator;
    }

    // Sum of per-color binomial products over the completions whose two
    // boxes end with equal distinct-color counts.
    private long walk(int[] balls, int index, int remaining, int distinct1, int distinct2) {
        if (index == balls.length) {
            return remaining == 0 && distinct1 == distinct2 ? 1 : 0;
        }
        int count = balls[index];
        long ways = 0;
        for (int x = 0; x <= Math.min(count, remaining); x++) {
            ways +=
                binomial(count, x) *
                walk(balls, index + 1, remaining - x, distinct1 + (x > 0 ? 1 : 0), distinct2 + (x < count ? 1 : 0));
        }
        return ways;
    }

    private long binomial(int n, int k) {
        long result = 1;
        for (int i = 1; i <= k; i++) {
            result = (result * (n - k + i)) / i;
        }
        return result;
    }
}
