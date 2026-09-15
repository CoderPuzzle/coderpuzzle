class Solution {
  public:
    long long maxRunTime(int n, vector<int> &batteries) {
        long long sum = 0;
        for (int b : batteries) {
            sum += b;
        }
        auto feasible = [&](long long t) {
            // Over a t-minute horizon a battery powers one computer at a
            // time, so it contributes at most min(b, t) computer-minutes;
            // the capped pool is freely schedulable, and n computers for t
            // minutes need exactly n*t.
            long long total = 0;
            for (int b : batteries) {
                total += min((long long)b, t);
            }
            return total >= (long long)n * t;
        };
        // Feasibility is monotone in t, so binary search the largest t; the
        // total charge over n computers is an absolute ceiling.
        long long lo = 0;
        long long hi = sum / n;
        while (lo < hi) {
            // Upper-mid keeps the search converging on the max feasible value.
            long long mid = (lo + hi + 1) / 2;
            if (feasible(mid)) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return lo;
    }
};
