#include <queue>
#include <tuple>
#include <vector>

class Solution {
  public:
    long long maxSpending(std::vector<std::vector<int>> &values) {
        // Each row is non-increasing, so a shop's cheapest unbought item
        // always sits at the moving tail. Buying the globally cheapest
        // tail on each (cheapest-first) day pairs every value with the
        // smallest day it can still take, which an exchange argument
        // shows is optimal: swapping any two days' purchases never pays.
        using Tail = std::tuple<long long, int, int>;
        std::priority_queue<Tail, std::vector<Tail>, std::greater<Tail>> tails;
        for (int shop = 0; shop < static_cast<int>(values.size()); ++shop) {
            tails.push({values[shop].back(), shop, static_cast<int>(values[shop].size()) - 1});
        }
        long long total = 0;
        long long days = static_cast<long long>(values.size()) * static_cast<long long>(values[0].size());
        for (long long day = 1; day <= days; ++day) {
            auto [value, shop, position] = tails.top();
            tails.pop();
            total += value * day;
            if (position > 0) {
                tails.push({values[shop][position - 1], shop, position - 1});
            }
        }
        return total;
    }
};
