class Solution {
  public:
    bool isReachable(int targetX, int targetY) {
        // Reachability invariant: subtractive moves preserve gcd(x, y)
        // exactly and doubling moves scale it by a factor of 2, so along
        // any path from (1, 1) the ODD part of the gcd never changes --
        // and it starts at 1. Hence a reachable point's gcd must be a
        // power of two. The converse is constructive in reverse (Euclid
        // with halvings), so the test is gcd == 2^k via g & (g - 1) == 0.
        // Coordinates are <= 10^9, so every intermediate fits an int.
        long long x = targetX, y = targetY;
        while (y != 0) {
            long long t = x % y;
            x = y;
            y = t;
        }
        return (x & (x - 1)) == 0;
    }
};
