class Solution {
  public:
    int minimumPerimeter(long long neededApples) {
        // A square plot with half-side k covers the integer coordinates
        // [-k,k]^2. Summing |i| + |j| over that box gives
        // apples(k) = 2k(k+1)(2k+1); the answer is 8k for the smallest k with
        // apples(k) >= neededApples. neededApples <= 1e15 implies k <= 63000,
        // keeping every intermediate within long long.
        auto apples = [](long long k) { return 2 * k * (k + 1) * (2 * k + 1); };
        long long lo = 1, hi = 1;
        while (apples(hi) < neededApples)
            hi *= 2;
        while (lo < hi) {
            long long mid = (lo + hi) / 2;
            if (apples(mid) >= neededApples)
                hi = mid;
            else
                lo = mid + 1;
        }
        return (int)(8 * lo);
    }
};
