#include <vector>

class Solution {
  public:
    // Difference array over years: +1 at birth, -1 at death; a prefix
    // sweep reconstructs each year's population.
    int maximumPopulation(std::vector<std::vector<int>> &logs) {
        std::vector<int> delta(2052, 0);
        for (auto &log : logs) {
            delta[log[0]]++;
            delta[log[1]]--;
        }
        int best_year = 1950;
        int best_pop = -1;
        int cur = 0;
        for (int year = 1950; year <= 2050; year++) {
            cur += delta[year];
            if (cur > best_pop) {
                best_pop = cur;
                best_year = year;
            }
        }
        return best_year;
    }
};
