#include <algorithm>
#include <vector>

class Solution {
  public:
    long long maxArea(long long h, long long w, std::vector<long long> &horizontalCuts,
                      std::vector<long long> &verticalCuts) {
        const long long MOD = 1'000'000'007LL;
        long long maxH = widest(h, horizontalCuts);
        long long maxW = widest(w, verticalCuts);
        return (maxH % MOD) * (maxW % MOD) % MOD;
    }

  private:
    long long widest(long long length, std::vector<long long> &cuts) {
        std::sort(cuts.begin(), cuts.end());
        long long best = std::max(cuts.front(), length - cuts.back());
        for (int i = 1; i < (int)cuts.size(); i++) {
            best = std::max(best, cuts[i] - cuts[i - 1]);
        }
        return best;
    }
};
