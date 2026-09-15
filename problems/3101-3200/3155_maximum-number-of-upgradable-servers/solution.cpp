#include <vector>

class Solution {
  public:
    vector<int> maxUpgrades(vector<int> &count, vector<int> &upgrade, vector<int> &sell, vector<int> &money) {
        // For one data center, upgrading u servers is feasible exactly when
        // selling some of the remaining servers can bridge the shortfall:
        // u * upgrade may exceed money only if ceil(shortfall / sell) extra
        // servers sold still leave u un-upgraded hosts. Feasibility never
        // flips back as u grows, so a binary search on u finds the maximum.
        // Products reach 10^5 * 10^5 = 10^10, past int range: 64-bit math.
        int n = static_cast<int>(count.size());
        std::vector<int> answer(n);
        for (int i = 0; i < n; ++i) {
            int lo = 0;
            int hi = count[i];
            while (lo < hi) {
                int mid = lo + (hi - lo + 1) / 2;
                long long spent = static_cast<long long>(mid) * upgrade[i];
                bool feasible;
                if (spent <= money[i]) {
                    feasible = true;
                } else {
                    long long shortfall = spent - money[i];
                    long long to_sell = (shortfall + sell[i] - 1) / sell[i];
                    feasible = to_sell + mid <= count[i];
                }
                if (feasible)
                    lo = mid;
                else
                    hi = mid - 1;
            }
            answer[i] = lo;
        }
        return answer;
    }
};
