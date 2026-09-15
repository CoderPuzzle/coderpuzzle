class Solution {
  public:
    long long minNumberOfSeconds(int mountainHeight, vector<int> &workerTimes) {
        long long maxW = 0;
        for (int wt : workerTimes) {
            maxW = max<long long>(maxW, wt);
        }
        long long h = mountainHeight;
        long long hi = maxW * h * (h + 1) / 2;
        long long lo = 0;
        while (lo < hi) {
            long long mid = lo + (hi - lo) / 2;
            long long total = 0;
            for (int wt : workerTimes) {
                total += units(wt, mid);
                if (total >= mountainHeight) {
                    break;
                }
            }
            if (total >= mountainHeight) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

  private:
    // largest x such that wt * x*(x+1)/2 <= t
    long long units(long long wt, long long t) {
        long long c = (2 * t) / wt;
        long long v = 1 + 4 * c;
        long long r = (long long)sqrtl((long double)v);
        if (r < 0) {
            r = 0;
        }
        while (r * r > v) {
            r--;
        }
        while ((r + 1) * (r + 1) <= v) {
            r++;
        }
        return (r - 1) / 2;
    }
};
