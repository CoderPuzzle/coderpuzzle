class Solution {
  public:
    int minDifference(vector<int> &nums) {
        // Binary search the answer d and probe feasibility. A probe checks
        // the unchangeable adjacent known pairs, then every maximal run of
        // -1s. Order the pair as x <= y: a run between lo <= hi accepts x
        // alone, y alone (a value within d of both ends), or — with two or
        // more missing cells — a straddle (x within d of lo, y within d of
        // hi). "Far" mode stabs every run's both-end interval with two
        // free values; "close" mode slides a pair with y - x <= d over
        // candidate spots and intersects the one interval each run leaves
        // for y. Reach values hit ~4*10^9 which overflows int, so the
        // interval math lives in long long; the answer itself is < 10^9.
        int knownCount = 0;
        long long mn = LLONG_MAX;
        long long mx = LLONG_MIN;
        for (int v : nums) {
            if (v != -1) {
                knownCount++;
                mn = min(mn, (long long)v);
                mx = max(mx, (long long)v);
            }
        }
        if (knownCount < 2) {
            return 0; // fill everything with the single known value (or 1)
        }
        // runs: {lo, hi, oneSided, length}; a one-sided run touches an
        // array end, so lo == hi is its single known neighbour
        vector<array<long long, 4>> runs;
        long long prev = 0;
        long long run = 0;
        for (int v : nums) {
            if (v == -1) {
                run++;
                continue;
            }
            if (run != 0) {
                if (prev != 0) {
                    runs.push_back({min(prev, (long long)v), max(prev, (long long)v), 0, run});
                } else {
                    runs.push_back({(long long)v, (long long)v, 1, run});
                }
                run = 0;
            }
            prev = v;
        }
        if (run != 0) {
            runs.push_back({prev, prev, 1, run});
        }
        long long knownAdj = 0;
        for (int i = 1; i < (int)nums.size(); i++) {
            if (nums[i - 1] != -1 && nums[i] != -1) {
                knownAdj = max(knownAdj, abs((long long)nums[i] - nums[i - 1]));
            }
        }
        long long lo = 0;
        long long hi = mx - mn;
        while (lo < hi) {
            long long mid = (lo + hi) / 2;
            if (feasible(runs, knownAdj, mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return (int)lo;
    }

  private:
    bool feasible(vector<array<long long, 4>> &runs, long long knownAdj, long long d) {
        if (d < knownAdj) {
            return false;
        }
        // FAR: two stabbers for every run's both-end interval
        bool broken = false;
        vector<array<long long, 2>> ivs;
        for (auto &r : runs) {
            long long a = r[2] == 1 ? r[0] - d : r[1] - d;
            if (a > r[0] + d) {
                broken = true;
                break;
            }
            ivs.push_back({a, r[0] + d});
        }
        if (!broken) {
            if (ivs.empty()) {
                return true; // no runs: known pairs were the only bound
            }
            sort(ivs.begin(), ivs.end(), [](auto &u, auto &w) { return u[1] < w[1]; });
            long long p = ivs[0][1]; // classic right-endpoint stab
            vector<array<long long, 2>> rest;
            for (auto &t : ivs) {
                if (t[0] > p || p > t[1]) {
                    rest.push_back(t);
                }
            }
            if (rest.empty()) {
                return true;
            }
            long long q = rest[0][1];
            bool all = true;
            for (auto &t : rest) {
                if (t[0] > q || q > t[1]) {
                    all = false;
                    break;
                }
            }
            if (all) {
                return true;
            }
        }
        // CLOSE: y - x <= d; intersect the interval each run leaves for y
        vector<long long> cand;
        cand.push_back(1);
        for (auto &r : runs) {
            cand.push_back(r[0] - d);
            cand.push_back(r[0] + d);
            cand.push_back(r[0] - 2 * d);
            cand.push_back(r[1] - d);
            cand.push_back(r[1] + d);
            cand.push_back(r[1] - 2 * d);
        }
        sort(cand.begin(), cand.end());
        for (long long x : cand) {
            if (x < 1) {
                continue;
            }
            long long glo = 1;
            long long ghi = 4000000000LL;
            bool ok = true;
            for (auto &r : runs) {
                long long jlo = r[2] == 1 ? r[0] - d : r[1] - d;
                long long jhi = r[0] + d;
                if (jlo <= x && x <= jhi) {
                    continue; // x alone covers this run
                }
                long long alo;
                long long ahi;
                if (r[2] != 1 && r[3] >= 2 && r[0] - d <= x && x <= r[0] + d) {
                    alo = r[1] - d;
                    ahi = r[1] + d; // straddle: y takes the far end
                } else {
                    alo = jlo;
                    ahi = jhi; // y must cover both ends
                }
                if (alo > ahi) {
                    ok = false;
                    break;
                }
                glo = max(glo, alo);
                ghi = min(ghi, ahi);
                if (glo > ghi) {
                    ok = false;
                    break;
                }
            }
            if (ok && glo <= x + d && ghi >= x) {
                return true;
            }
        }
        return false;
    }
};
