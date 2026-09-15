// Appends the inclusive pieces of [lo1, hi1] that avoid [lo2, hi2]; returns
// the new piece count (at most two pieces ever fit).
static int addPieces(int lo1, int hi1, int lo2, int hi2, int *loOut, int *hiOut, int count) {
    if (lo1 > hi1)
        return count;
    if (hi2 < lo1 || lo2 > hi1) {
        loOut[count] = lo1;
        hiOut[count] = hi1;
        ++count;
    } else {
        if (lo1 < lo2) {
            loOut[count] = lo1;
            hiOut[count] = lo2 - 1;
            ++count;
        }
        if (hi2 < hi1) {
            loOut[count] = hi2 + 1;
            hiOut[count] = hi1;
            ++count;
        }
    }
    return count;
}

class Solution {
  public:
    vector<bool> canMakePalindromeQueries(string s, vector<vector<int>> &queries) {
        int n = (int)s.size(), half = n / 2;
        // prefix[i + 1][k] = occurrences of 'a' + k in s[0..i]
        vector<array<int, 26>> prefix(n + 1);
        prefix[0].fill(0);
        for (int i = 0; i < n; ++i) {
            prefix[i + 1] = prefix[i];
            ++prefix[i + 1][s[i] - 'a'];
        }
        // mismatch[i + 1] = pairs (x, n-1-x), x <= i, whose characters differ —
        // pairs a query repairs only by covering x or its mirror on its side.
        vector<int> mismatch(half + 1, 0);
        for (int x = 0; x < half; ++x)
            mismatch[x + 1] = mismatch[x] + (s[x] != s[n - 1 - x] ? 1 : 0);

        vector<bool> answer;
        answer.reserve(queries.size());
        int fixedLo[4], fixedHi[4]; // fully fixed left-half ranges
        int flLo[2], flHi[2];       // fixed characters facing [c, d]
        int frLo[2], frHi[2];       // fixed characters facing [a, b]
        for (const vector<int> &query : queries) {
            int a = query[0], b = query[1], c = query[2], d = query[3];
            int m1 = n - 1 - b, m2 = n - 1 - a; // mirror of [a, b], right half
            int f1 = n - 1 - d, f2 = n - 1 - c; // mirror of [c, d], left half
            // Pairs covered on neither side must already match.
            int count = addPieces(0, a - 1, f1, f2, fixedLo, fixedHi, 0);
            count = addPieces(b + 1, half - 1, f1, f2, fixedLo, fixedHi, count);
            int bad = 0;
            for (int i = 0; i < count; ++i)
                bad += mismatch[fixedHi[i] + 1] - mismatch[fixedLo[i]];
            if (bad > 0) {
                answer.push_back(false);
                continue;
            }
            // Pool balance per letter: A + F_L == B + F_R with A covering F_R.
            int flCount = addPieces(f1, f2, a, b, flLo, flHi, 0);
            int frCount = addPieces(m1, m2, c, d, frLo, frHi, 0);
            bool ok = true;
            for (int k = 0; k < 26 && ok; ++k) {
                int poolA = prefix[b + 1][k] - prefix[a][k];
                int poolB = prefix[d + 1][k] - prefix[c][k];
                int left = poolA, right = poolB, fixedR = 0;
                for (int i = 0; i < flCount; ++i)
                    left += prefix[flHi[i] + 1][k] - prefix[flLo[i]][k];
                for (int i = 0; i < frCount; ++i) {
                    int piece = prefix[frHi[i] + 1][k] - prefix[frLo[i]][k];
                    right += piece;
                    fixedR += piece;
                }
                if (left != right || poolA < fixedR)
                    ok = false;
            }
            answer.push_back(ok);
        }
        return answer;
    }
};
