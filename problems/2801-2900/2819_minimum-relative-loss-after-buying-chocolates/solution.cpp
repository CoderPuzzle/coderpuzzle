#include <algorithm>
#include <vector>

using namespace std;

class Solution {
  public:
    vector<long long> minimumRelativeLosses(vector<int> &prices, vector<vector<int>> &queries) {
        sort(prices.begin(), prices.end());
        int n = prices.size();
        vector<long long> prefix(n + 1, 0);
        for (int i = 0; i < n; ++i) {
            prefix[i + 1] = prefix[i] + prices[i];
        }
        vector<long long> answer;
        answer.reserve(queries.size());
        for (auto &query : queries) {
            long long k = query[0];
            int m = query[1];
            // Every answer intermediate stays near 2 * 10^5 * 10^9, inside long long.
            int split = upper_bound(prices.begin(), prices.end(), (int)k) - prices.begin();
            int lo = max(0, m - (n - split));
            int hi = min(m, split);
            while (lo < hi) {
                int mid = (lo + hi) / 2;
                if ((long long)prices[mid] + prices[n - m + mid] >= 2 * k) {
                    hi = mid;
                } else {
                    lo = mid + 1;
                }
            }
            int rest = m - lo;
            answer.push_back(prefix[lo] + 2 * k * rest - (prefix[n] - prefix[n - rest]));
        }
        return answer;
    }
};
