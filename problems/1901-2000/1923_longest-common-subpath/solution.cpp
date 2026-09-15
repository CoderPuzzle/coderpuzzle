class Solution {
  public:
    int longestCommonSubpath(int n, vector<vector<int>> &paths) {
        // Two independent moduli paired in the key make an accidental collision
        // astronomically unlikely.
        const long long MOD1 = 1000000007LL;
        const long long MOD2 = 1000000009LL;
        const long long BASE = 1000003LL;

        int lo = 0, hi = INT_MAX;
        for (auto &p : paths)
            hi = min(hi, (int)p.size());

        // Existence is monotone in L (any prefix of a common subpath is common),
        // so upper-mid binary search converges on the maximum feasible length.
        while (lo < hi) {
            int mid = (lo + hi + 1) / 2;
            if (exists(mid, paths, MOD1, MOD2, BASE)) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return lo;
    }

  private:
    static bool exists(int length, vector<vector<int>> &paths, long long MOD1, long long MOD2, long long BASE) {
        set<pair<long long, long long>> common;
        bool haveCommon = false;
        for (auto &path : paths) {
            if ((int)path.size() < length)
                return false;
            long long h1 = 0, h2 = 0;
            long long power1 = 1, power2 = 1;
            // +1 per city id so a run of city 0 never hashes to the all-zero value.
            for (int i = 0; i < length; i++) {
                h1 = (h1 * BASE + path[i] + 1) % MOD1;
                h2 = (h2 * BASE + path[i] + 1) % MOD2;
                power1 = power1 * BASE % MOD1;
                power2 = power2 * BASE % MOD2;
            }
            set<pair<long long, long long>> hashes;
            hashes.insert(make_pair(h1, h2));
            // Roll the window: multiply by base, drop the outgoing digit
            // weighted by BASE^L, add the incoming digit (constant per step).
            for (size_t i = length; i < path.size(); i++) {
                long long out1 = (path[i - length] + 1) * power1 % MOD1;
                long long out2 = (path[i - length] + 1) * power2 % MOD2;
                h1 = ((h1 * BASE - out1) % MOD1 + MOD1) % MOD1;
                h2 = ((h2 * BASE - out2) % MOD2 + MOD2) % MOD2;
                h1 = (h1 + path[i] + 1) % MOD1;
                h2 = (h2 + path[i] + 1) % MOD2;
                hashes.insert(make_pair(h1, h2));
            }
            // The first path seeds the set; each later path intersects into
            // it, bailing out the moment the intersection empties.
            if (!haveCommon) {
                common = hashes;
                haveCommon = true;
            } else {
                set<pair<long long, long long>> next;
                for (auto &kv : common) {
                    if (hashes.count(kv))
                        next.insert(kv);
                }
                common.swap(next);
                if (common.empty())
                    return false;
            }
        }
        return haveCommon && !common.empty();
    }
};
