class Solution {
  public:
    int longestBalanced(string s) {
        int n = (int)s.size();
        // Any single character is balanced, so with n >= 1 the answer is at
        // least 1.
        int best = 1;

        // Case 1 — one distinct letter: balance is vacuous over a run, so
        // track the longest run of equal neighbors.
        int run = 1;
        for (int i = 1; i < n; i++) {
            run = (s[i] == s[i - 1]) ? run + 1 : 1;
            best = max(best, run);
        }

        // Case 2 — two distinct letters x and y: walk the string ignoring
        // the third letter z, keeping the running difference of their counts.
        // Two positions sharing a difference enclose a stretch that balances
        // the pair. Each z restarts the scan (a window through it would carry
        // a third letter), so first-seen slots carry a version stamp that the
        // split bumps instead of clearing the arrays.
        for (int x = 0; x < 3; x++) {
            for (int y = x + 1; y < 3; y++) {
                int z = 3 - x - y;
                vector<int> first(2 * n + 1, -1);
                vector<int> stamp(2 * n + 1, -1);
                stamp[n] = 0; // difference 0 precedes index 0
                first[n] = -1;
                int version = 0, d = 0;
                for (int i = 0; i < n; i++) {
                    int c = s[i] - 'a';
                    if (c == z) {
                        version++;
                        d = 0;
                        stamp[n] = version;
                        first[n] = i;
                    } else {
                        d += (c == x) ? 1 : -1;
                        int v = d + n;
                        if (stamp[v] == version) {
                            best = max(best, i - first[v]);
                        } else {
                            stamp[v] = version;
                            first[v] = i;
                        }
                    }
                }
            }
        }

        // Case 3 — all three letters: hash each prefix's signature
        // (count_b - count_a, count_c - count_a); equal signatures at two
        // prefixes mean the stretch between them changed all three counts by
        // the same amounts. The earliest index per signature maximizes
        // length.
        unordered_map<long long, int> sigs;
        long long width = 2LL * n + 1;
        sigs[(long long)n * width + n] = -1;
        int ca = 0, cb = 0, cc = 0;
        for (int i = 0; i < n; i++) {
            if (s[i] == 'a') {
                ca++;
            } else if (s[i] == 'b') {
                cb++;
            } else {
                cc++;
            }
            long long sig = (long long)(cb - ca + n) * width + (cc - ca + n);
            auto it = sigs.find(sig);
            if (it == sigs.end()) {
                sigs[sig] = i;
            } else {
                best = max(best, i - it->second);
            }
        }

        return best;
    }
};
