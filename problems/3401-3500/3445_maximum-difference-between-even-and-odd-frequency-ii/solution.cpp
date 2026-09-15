class Solution {
  public:
    int maxDifference(string s, int k) {
        int n = (int)s.size();
        long long best = LLONG_MIN;
        vector<int> diff(n + 1), pa(n + 1), pb(n + 1), lastBAt(n + 1);
        for (int a = 0; a < 5; a++) {
            for (int b = 0; b < 5; b++) {
                if (a == b)
                    continue;
                int lastB = -1;
                for (int i = 0; i < n; i++) {
                    int d = s[i] - '0';
                    diff[i + 1] = diff[i];
                    pa[i + 1] = pa[i];
                    pb[i + 1] = pb[i];
                    if (d == a) {
                        diff[i + 1] += 1;
                        pa[i + 1] ^= 1;
                    } else if (d == b) {
                        diff[i + 1] -= 1;
                        pb[i + 1] ^= 1;
                        lastB = i;
                    }
                    lastBAt[i + 1] = lastB;
                }
                const long long INF = LLONG_MAX;
                long long minVal[2][2] = {{INF, INF}, {INF, INF}};
                int prevBound = -1;
                for (int r = 1; r <= n; r++) {
                    int lb = lastBAt[r];
                    int bound = (lb == -1) ? -1 : min(r - k, lb);
                    if (bound >= 0) {
                        for (int l = prevBound + 1; l <= bound; l++) {
                            int v = diff[l];
                            if (v < minVal[pa[l]][pb[l]]) {
                                minVal[pa[l]][pb[l]] = v;
                            }
                        }
                        prevBound = bound;
                        long long mv = minVal[pa[r] ^ 1][pb[r]];
                        if (mv != INF) {
                            long long cand = diff[r] - mv;
                            if (cand > best)
                                best = cand;
                        }
                    }
                }
            }
        }
        return (int)best;
    }
};
