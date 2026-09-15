#include <algorithm>
#include <vector>

using namespace std;

class Solution {
  public:
    vector<long long> minimumCosts(vector<int> &regular, vector<int> &express, int expressCost) {
        // Track the cheapest cost to reach the previous stop on each route;
        // at stop 0 only the regular seat exists, so exp starts unreachable
        // (a huge sentinel). Dropping express -> regular is free; boarding
        // regular -> express costs expressCost every time. Totals reach
        // ~2e10, so every cost is carried in long long, never in int.
        const long long INF = 1LL << 60;
        long long reg = 0, exp = INF;
        vector<long long> costs;
        costs.reserve(regular.size());
        for (size_t i = 0; i < regular.size(); ++i) {
            long long new_reg = min(reg, exp) + regular[i];
            long long new_exp = min(reg + expressCost, exp) + express[i];
            reg = new_reg;
            exp = new_exp;
            costs.push_back(min(reg, exp));
        }
        return costs;
    }
};
