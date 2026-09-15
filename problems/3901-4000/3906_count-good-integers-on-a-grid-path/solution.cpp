#include <string>
#include <vector>

using namespace std;

class Solution {
  public:
    long long countGoodIntegersOnPath(long long l, long long r, string directions) {
        vector<bool> selected(16, false);
        int row = 0, column = 0;
        selected[0] = true;
        for (char move : directions) {
            if (move == 'D')
                ++row;
            else
                ++column;
            selected[row * 4 + column] = true;
        }
        return countUpTo(r, selected) - countUpTo(l - 1, selected);
    }

  private:
    long long countUpTo(long long bound, const vector<bool> &selected) {
        if (bound < 0)
            return 0;
        string value = to_string(bound);
        value = string(16 - value.size(), '0') + value;
        vector<vector<long long>> dp(2, vector<long long>(11));
        dp[1][10] = 1;
        for (int position = 0; position < 16; ++position) {
            vector<vector<long long>> next(2, vector<long long>(11));
            for (int tight = 0; tight < 2; ++tight) {
                int limit = tight ? value[position] - '0' : 9;
                for (int previous = 0; previous <= 10; ++previous) {
                    long long ways = dp[tight][previous];
                    if (ways == 0)
                        continue;
                    for (int digit = 0; digit <= limit; ++digit) {
                        if (selected[position] && previous != 10 && digit < previous)
                            continue;
                        int nextPrevious = selected[position] ? digit : previous;
                        int nextTight = tight && digit == limit;
                        next[nextTight][nextPrevious] += ways;
                    }
                }
            }
            dp = move(next);
        }
        long long total = 0;
        for (const auto &row : dp)
            for (long long ways : row)
                total += ways;
        return total;
    }
};
