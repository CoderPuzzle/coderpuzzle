#include <algorithm>
#include <cstring>
#include <vector>

class Solution {
  public:
    int minDistance(std::vector<int> &houses, int k) {
        std::sort(houses.begin(), houses.end());
        n = (int)houses.size();
        hs = &houses;
        memo.assign(n, std::vector<int>(k + 1, -1));
        return dp(0, k);
    }

  private:
    int n;
    std::vector<int> *hs;
    std::vector<std::vector<int>> memo;

    long long runCost(int i, int j) {
        long long total = 0;
        int lo = i, hi = j;
        while (lo < hi) {
            total += (*hs)[hi] - (*hs)[lo];
            ++lo;
            --hi;
        }
        return total;
    }

    int dp(int i, int boxes) {
        int remaining = n - i;
        if (boxes >= remaining) {
            return 0;
        }
        if (memo[i][boxes] != -1) {
            return memo[i][boxes];
        }
        if (boxes == 1) {
            return memo[i][boxes] = (int)runCost(i, n - 1);
        }
        long long best = 1e18;
        for (int j = i; j <= n - boxes; ++j) {
            best = std::min(best, runCost(i, j) + dp(j + 1, boxes - 1));
        }
        return memo[i][boxes] = (int)best;
    }
};
