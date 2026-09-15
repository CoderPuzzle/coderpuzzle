#include <algorithm>
#include <unordered_map>
#include <vector>

class Solution {
  public:
    std::vector<long long> avoidFlood(std::vector<long long> &rains) {
        int n = (int)rains.size();
        std::vector<int> zeros;
        std::unordered_map<long long, int> last;
        std::vector<long long> ans(n, -1);
        for (int i = 0; i < n; ++i) {
            long long r = rains[i];
            if (r == 0) {
                ans[i] = 1;
                zeros.insert(std::upper_bound(zeros.begin(), zeros.end(), i), i);
            } else {
                auto it = last.find(r);
                if (it != last.end()) {
                    int pos = (int)(std::upper_bound(zeros.begin(), zeros.end(), it->second) - zeros.begin());
                    if (pos == (int)zeros.size() || zeros[pos] >= i) {
                        return {};
                    }
                    ans[zeros[pos]] = r;
                    zeros.erase(zeros.begin() + pos);
                    it->second = i;
                } else {
                    last.emplace(r, i);
                }
            }
        }
        return ans;
    }
};
