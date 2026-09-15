#include <algorithm>
#include <vector>

class Solution {
  public:
    vector<long long> maximumCoins(vector<int> &heroes, vector<int> &monsters, vector<int> &coins) {
        // A hero that beats one monster beats every monster of smaller-or-equal
        // power too, so sorting (power, coin) pairs makes each answer a prefix
        // sum over that order: binary-search how many monsters sit at or below
        // the hero's power and read prefix[k]. Totals reach 10^5 * 10^9 =
        // 10^11, past int range, so counts and sums run in long long.
        int m = monsters.size();
        vector<int> order(m);
        for (int i = 0; i < m; ++i) {
            order[i] = i;
        }
        sort(order.begin(), order.end(), [&](int a, int b) { return monsters[a] < monsters[b]; });
        vector<long long> prefix(m + 1, 0);
        for (int i = 0; i < m; ++i) {
            prefix[i + 1] = prefix[i] + coins[order[i]];
        }
        vector<long long> ans;
        ans.reserve(heroes.size());
        for (int hero : heroes) {
            int lo = 0;
            int hi = m;
            while (lo < hi) {
                int mid = (lo + hi) / 2;
                if (monsters[order[mid]] <= hero) {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            ans.push_back(prefix[lo]);
        }
        return ans;
    }
};
