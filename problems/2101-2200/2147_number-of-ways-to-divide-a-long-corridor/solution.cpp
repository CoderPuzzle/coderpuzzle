class Solution {
  public:
    int numberOfWays(string corridor) {
        // Sections pair the seats up in order, so exactly one divider is
        // forced between each finished pair and the next seat — placeable
        // at any of the plants-plus-one positions inside that gap.
        const int MOD = 1'000'000'007;
        long long ways = 1;
        int seats = 0;
        int plants = 0;
        for (char c : corridor) {
            if (c == 'S') {
                seats++;
                if (seats > 2 && seats % 2 == 1) {
                    ways = ways * (plants + 1) % MOD;
                }
                plants = 0;
            } else if (seats >= 2) {
                plants++;
            }
        }
        return (seats > 0 && seats % 2 == 0) ? (int)ways : 0;
    }
};
