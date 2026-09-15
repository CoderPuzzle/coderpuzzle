class Solution {
  public:
    int maxSubstringLength(string s) {
        int n = static_cast<int>(s.size());
        int first[26];
        int last[26];
        fill(begin(first), end(first), -1);
        // Prefix counts make "does letter d occur inside s[l..r]" a plain
        // count difference, driving both the closure cascade and the
        // final validation.
        vector<vector<int>> counts(n + 1, vector<int>(26, 0));
        for (int i = 0; i < n; i++) {
            counts[i + 1] = counts[i];
            int d = s[i] - 'a';
            counts[i + 1][d]++;
            if (first[d] == -1) {
                first[d] = i;
            }
            last[d] = i;
        }

        // A self-contained window always starts at the first occurrence
        // of its own leading character, so only those positions are
        // anchors.
        int best = -1;
        for (int c = 0; c < 26; c++) {
            if (first[c] == -1) {
                continue;
            }
            int l = first[c];
            int r = last[s[l] - 'a'];
            while (true) {
                // Stabilize: extend the right end until every letter
                // occurring inside s[l..r] is fully contained there,
                // tracking the earliest first occurrence among them.
                int minFirst = INT_MAX;
                while (true) {
                    int newR = r;
                    minFirst = INT_MAX;
                    for (int d = 0; d < 26; d++) {
                        if (counts[r + 1][d] - counts[l][d] > 0) {
                            if (last[d] > newR) {
                                newR = last[d];
                            }
                            if (first[d] < minFirst) {
                                minFirst = first[d];
                            }
                        }
                    }
                    if (newR == r) {
                        break;
                    }
                    r = newR;
                }
                if (minFirst >= l && !(l == 0 && r == n - 1)) {
                    best = max(best, r - l + 1);
                }
                if (r == n - 1) {
                    break;
                }
                // Absorb the next closed block wholesale; unions of
                // consecutive blocks surface as further fixpoints.
                r = last[s[r + 1] - 'a'];
            }
        }
        return best;
    }
};
