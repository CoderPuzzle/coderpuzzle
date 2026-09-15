#include <algorithm>
#include <vector>

using namespace std;

class Solution {
  public:
    long long numberOfWays(int n, vector<int> &limit) {
        const long long MOD = 1'000'000'007;
        int m = (int)limit.size();
        vector<int> a = limit;
        sort(a.begin(), a.end());
        // Breakpoints of the step function ways(x): x crossing 1, n, the
        // max() switch ceil(n / 2), L + 1 or n - L flips one of its num_ge
        // terms; ways is constant across each consecutive run.
        vector<long long> points;
        points.reserve(2 * m + 3);
        points.push_back(1);
        points.push_back(n);
        points.push_back((n + 1) / 2);
        for (int cap : a) {
            if (cap + 1 <= n)
                points.push_back(cap + 1);
            if (n - cap >= 1)
                points.push_back(n - cap);
        }
        sort(points.begin(), points.end());
        points.erase(unique(points.begin(), points.end()), points.end());
        // One representative per run, scaled by the run length: the
        // per-split count never exceeds m^2 (exact in long long), and the
        // reduced term times a run length < n stays inside i64.
        long long total = 0;
        for (size_t i = 0; i + 1 < points.size(); i++) {
            long long x = points[i];
            long long run = points[i + 1] - x;
            long long wider = max(x, (long long)n - x);
            long long ways = numGe(a, x) * numGe(a, n - x) - numGe(a, wider);
            total = (total + ways % MOD * run) % MOD;
        }
        return total;
    }

  private:
    // Colors whose limit reaches t: m minus the sorted caps below t. The
    // i == j diagonal of a split needs one cap to cover max(x, n - x).
    long long numGe(vector<int> &a, long long t) {
        return (long long)a.size() - (lower_bound(a.begin(), a.end(), t) - a.begin());
    }
};
