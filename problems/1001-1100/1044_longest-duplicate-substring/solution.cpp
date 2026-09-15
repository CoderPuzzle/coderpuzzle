class Solution {
  public:
    string longestDupSubstring(string s) {
        int n = (int)s.size();
        vector<long long> a(n);
        for (int i = 0; i < n; i++)
            a[i] = s[i] - 'a';
        const long long MOD1 = 1000000007LL;
        const long long MOD2 = 1000000009LL;
        const long long BASE = 26;

        // Precomputed base powers so each rolling-hash slide costs O(1).
        vector<long long> pow1(n + 1, 1), pow2(n + 1, 1);
        for (int i = 1; i <= n; i++) {
            pow1[i] = pow1[i - 1] * BASE % MOD1;
            pow2[i] = pow2[i - 1] * BASE % MOD2;
        }

        // Returns a start index of some length-`length` duplicate, else -1.
        auto check = [&](int length) -> int {
            if (length == 0)
                return -1;
            long long h1 = 0, h2 = 0;
            for (int i = 0; i < length; i++) {
                h1 = (h1 * BASE + a[i]) % MOD1;
                h2 = (h2 * BASE + a[i]) % MOD2;
            }
            unordered_map<long long, vector<int>> seen;
            auto keyOf = [&](long long x, long long y) { return x * (MOD2 + 7) + y; };
            seen[keyOf(h1, h2)].push_back(0);
            for (int i = 1; i + length <= n; i++) {
                // Roll: drop the leftmost character's contribution, append the
                // incoming one.
                long long t1 = (h1 - a[i - 1] * pow1[length - 1]) % MOD1;
                if (t1 < 0)
                    t1 += MOD1;
                h1 = (t1 * BASE + a[i + length - 1]) % MOD1;
                long long t2 = (h2 - a[i - 1] * pow2[length - 1]) % MOD2;
                if (t2 < 0)
                    t2 += MOD2;
                h2 = (t2 * BASE + a[i + length - 1]) % MOD2;
                // Two independent polynomial hashes form the key; a repeat is
                // still verified character by character so collisions can
                // never produce a wrong answer.
                long long key = keyOf(h1, h2);
                auto it = seen.find(key);
                if (it != seen.end()) {
                    bool matched = false;
                    for (int start : it->second) {
                        bool eq = true;
                        for (int t = 0; t < length; t++) {
                            if (a[start + t] != a[i + t]) {
                                eq = false;
                                break;
                            }
                        }
                        if (eq) {
                            matched = true;
                            break;
                        }
                    }
                    if (matched)
                        return i;
                    it->second.push_back(i);
                } else {
                    seen[key].push_back(i);
                }
            }
            return -1;
        };

        // Monotonicity: a duplicate of length L implies duplicates at every
        // shorter length, so feasible lengths form a prefix — binary search
        // the largest one.
        int lo = 1, hi = n;
        int bestLength = 0, bestStart = -1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            int idx = check(mid);
            if (idx != -1) {
                bestLength = mid;
                bestStart = idx;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }

        if (bestLength == 0)
            return "";
        return s.substr(bestStart, bestLength);
    }
};
