class Solution {

    public int minimumPerimeter(long neededApples) {
        // A square plot with half-side k covers the integer coordinates
        // [-k,k]^2. Summing |i| + |j| over that box gives
        // apples(k) = 2k(k+1)(2k+1); the answer is 8k for the smallest k with
        // apples(k) >= neededApples. neededApples <= 10^15 implies k <= 63000,
        // keeping every intermediate within long.
        long lo = 1;
        long hi = 1;
        while (2 * hi * (hi + 1) * (2 * hi + 1) < neededApples) {
            hi *= 2;
        }
        while (lo < hi) {
            long mid = (lo + hi) / 2;
            if (2 * mid * (mid + 1) * (2 * mid + 1) >= neededApples) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return (int) (8 * lo);
    }
}
