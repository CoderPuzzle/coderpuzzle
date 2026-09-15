class Solution {
  public:
    long long maxPower(vector<int> &stations, int r, int k) {
        int n = (int)stations.size();
        // power[i] = initial number of power stations serving city i
        vector<long long> diff(n + 1, 0);
        for (int i = 0; i < n; i++) {
            long long s = stations[i];
            int left = max(0, i - r);
            int right = min(n - 1, i + r);
            diff[left] += s;
            diff[right + 1] -= s;
        }
        vector<long long> power(n, 0);
        long long cur = 0;
        for (int i = 0; i < n; i++) {
            cur += diff[i];
            power[i] = cur;
        }

        long long kk = k;
        long long minPower = LLONG_MAX;
        for (long long p : power) {
            minPower = min(minPower, p);
        }
        vector<long long> extra(n + 1, 0);

        auto feasible = [&](long long target) {
            fill(extra.begin(), extra.end(), 0LL);
            long long cur2 = 0;
            long long used = 0;
            for (int i = 0; i < n; i++) {
                cur2 += extra[i];
                long long have = power[i] + cur2;
                if (have < target) {
                    long long need = target - have;
                    used += need;
                    if (used > kk) {
                        return false;
                    }
                    int right = min(n - 1, i + r);
                    extra[right + 1] -= need;
                    cur2 += need;
                }
            }
            return used <= kk;
        };

        // each new station raises any single city's power by at most 1,
        // so the answer never exceeds min(power) + k
        long long lo = 0;
        long long hi = minPower + kk;
        while (lo < hi) {
            long long mid = lo + (hi - lo + 1) / 2;
            if (feasible(mid)) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return lo;
    }
};
