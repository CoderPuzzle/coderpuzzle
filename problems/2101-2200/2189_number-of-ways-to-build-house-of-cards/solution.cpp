#include <vector>

class Solution {
  public:
    int houseOfCards(int n) {
        // Rows shrink going up; a row of k triangles costs 3k - 1 cards.
        // dp[remaining][allowed]: ways to finish using `remaining` cards
        // when the next (upper) row may hold at most `allowed`
        // triangles. Iterative over the remaining-card count.
        std::vector<std::vector<int>> dp(n + 1, std::vector<int>(n + 2, 0));
        // Nothing left means the house is complete, whatever bound applies.
        for (int allowed = 0; allowed <= n + 1; ++allowed) {
            dp[0][allowed] = 1;
        }
        for (int remaining = 2; remaining <= n; ++remaining) {
            for (int allowed = 1; allowed <= n; ++allowed) {
                long long total = 0;
                for (int k = 1; k <= allowed && 3 * k - 1 <= remaining; ++k) {
                    int used = 3 * k - 1;
                    if (used == remaining) {
                        total += 1;
                    } else {
                        total += dp[remaining - used][k - 1];
                    }
                }
                // Counts for n <= 500 stay near 2.5 * 10^7, far inside
                // int; the mod only guards intermediate sums.
                dp[remaining][allowed] = static_cast<int>(total % 1000000007LL);
            }
        }
        return dp[n][n];
    }
};
