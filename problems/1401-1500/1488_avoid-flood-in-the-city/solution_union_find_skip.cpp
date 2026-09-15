#include <numeric>
#include <unordered_map>
#include <vector>

class Solution {
  public:
    std::vector<long long> avoidFlood(std::vector<long long> &rains) {
        int n = (int)rains.size();
        std::vector<int> nxt(n + 2);
        std::iota(nxt.begin(), nxt.end(), 0);
        std::unordered_map<long long, int> last;
        std::vector<long long> ans(n, -1);
        for (int i = 0; i < n; ++i) {
            long long r = rains[i];
            if (r == 0) {
                ans[i] = 1;
            } else {
                nxt[i] = i + 1;
                auto it = last.find(r);
                if (it != last.end()) {
                    int j = find(nxt, it->second + 1);
                    if (j >= i) {
                        return {};
                    }
                    ans[j] = r;
                    nxt[j] = j + 1;
                    it->second = i;
                } else {
                    last.emplace(r, i);
                }
            }
        }
        return ans;
    }

  private:
    int find(std::vector<int> &nxt, int x) {
        int root = x;
        while (nxt[root] != root) {
            root = nxt[root];
        }
        while (nxt[x] != root) {
            int step = nxt[x];
            nxt[x] = root;
            x = step;
        }
        return root;
    }
};
