class Solution {

    public long distributeCandies(int n, int limit) {
        // Inclusion-exclusion on the cap. Unbounded distributions of n
        // candies to 3 children number C(n + 2, 2). A child over the cap has
        // limit + 1 or more, so hand that child limit + 1 candies up front
        // and count the rest: C(n - (limit + 1) + 2, 2) per over-cap child,
        // added back in pairs C(3, 2) * C(n - 2 * (limit + 1) + 2, 2). The
        // triple term never fires: it needs n >= 3 * (limit + 1), which is
        // already past the 3 * limit total capacity, so those inputs are 0.
        if (n > 3 * limit) {
            return 0;
        }
        long total = 0;
        long[] binom = { 1, 3, 3 };
        for (int k = 0; k <= 2; ++k) {
            long rest = n - (long) k * (limit + 1);
            if (rest < 0) {
                break;
            }
            long ways = ((rest + 2) * (rest + 1)) / 2;
            total += (k % 2 == 0 ? 1 : -1) * binom[k] * ways;
        }
        return total;
    }
}
