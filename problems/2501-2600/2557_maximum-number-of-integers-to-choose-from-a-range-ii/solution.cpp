#include <algorithm>
#include <vector>

class Solution {
  public:
    int maxCount(std::vector<int> &banned, int n, long long maxSum) {
        // Smallest-first greedy computed gap by gap over the sorted,
        // de-duplicated bans: a free run of `avail` candidates starting
        // at `lo` costs avail*(2*lo+avail-1)/2 when swallowed whole. The
        // first run that cannot fit contains the answer's cutoff — every
        // later candidate is larger — so exactly one binary search caps
        // it and the walk stops there. Cost terms peak near avail*n ~
        // 3*10^18, inside the signed 64-bit range; the answer itself is
        // <= sqrt(2*maxSum) <= sqrt(2*10^15) ~ 4.5e7, far below 2^31.
        std::sort(banned.begin(), banned.end());
        banned.erase(std::unique(banned.begin(), banned.end()), banned.end());
        auto ladder = [](long long lo, long long cnt) -> long long { return cnt * (2 * lo + cnt - 1) / 2; };
        auto bestPrefix = [&](long long lo, long long avail) -> int {
            long long low = 0;
            long long high = avail;
            while (low < high) {
                long long mid = (low + high + 1) / 2;
                if (ladder(lo, mid) <= maxSum)
                    low = mid;
                else
                    high = mid - 1;
            }
            return static_cast<int>(low);
        };
        long long taken = 0;
        long long prev = 0;
        bool finished = false;
        for (int value : banned) {
            long long lo = prev + 1;
            long long avail = value - prev - 1;
            if (avail > 0) {
                long long cost = ladder(lo, avail);
                if (cost <= maxSum) {
                    taken += avail;
                    maxSum -= cost;
                } else {
                    taken += bestPrefix(lo, avail);
                    finished = true;
                    break;
                }
            }
            prev = value;
        }
        if (!finished && n > prev) {
            long long lo = prev + 1;
            long long avail = n - prev;
            long long cost = ladder(lo, avail);
            if (cost <= maxSum)
                taken += avail;
            else
                taken += bestPrefix(lo, avail);
        }
        return static_cast<int>(taken);
    }
};
