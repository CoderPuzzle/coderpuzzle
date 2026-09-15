#include <algorithm>
#include <vector>

class Solution {
  public:
    int minimumTime(vector<int> &hens, vector<int> &grains) {
        // Binary search the answer T, checked by a greedy sweep. With both
        // arrays sorted, hens in ascending order eating contiguous grain
        // prefixes is optimal by an exchange argument. A hen at h covering
        // grains up to g needs L + R + min(L, R) seconds, where
        // L = max(0, h - leftmost) and R = max(0, rightmost - h): whichever
        // extreme the hen reaches second becomes the double-walked detour.
        sort(hens.begin(), hens.end());
        sort(grains.begin(), grains.end());
        long long lo = 0;
        long long hi = 2000000000LL;
        while (lo < hi) {
            long long mid = lo + (hi - lo) / 2;
            if (feasible(mid, hens, grains)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return (int)lo;
    }

  private:
    bool feasible(long long t, const vector<int> &hens, const vector<int> &grains) {
        int j = 0;
        for (int h : hens) {
            if (j == (int)grains.size())
                break;
            // Segment cost fits a long long: left/right are at most 1e9 each.
            long long left = max(0, h - grains[j]);
            int k = j;
            while (k < (int)grains.size()) {
                long long right = max(0LL, (long long)grains[k] - h);
                if (min(2 * left + right, left + 2 * right) > t)
                    break;
                ++k;
            }
            j = k;
        }
        return j == (int)grains.size();
    }
};
