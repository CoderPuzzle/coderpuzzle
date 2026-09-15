class Solution {
  public:
    int minCharacters(string a, string b) {
        // An operation retargets one character anywhere, so only letter
        // counts matter. Condition 3 unifies both strings on one letter
        // c: every character that is not already c pays once. Conditions
        // 1 and 2 share a boundary after letter c — the lower string
        // pays its letters above c, the higher one its letters at or
        // below c — and one sweep with running below/above totals prices
        // both orientations at once. The boundary stops after 'y':
        // nothing can sit above 'z', so 'z' can never cap the lower
        // string.
        array<int, 26> countsA{}, countsB{};
        for (char c : a) {
            countsA[c - 'a']++;
        }
        for (char c : b) {
            countsB[c - 'a']++;
        }
        int n = a.size(), m = b.size();
        int best = n + m;
        for (int i = 0; i < 26; ++i) {
            best = min(best, n - countsA[i] + m - countsB[i]);
        }
        int aboveA = n, aboveB = m, belowA = 0, belowB = 0;
        for (int i = 0; i < 25; ++i) {
            aboveA -= countsA[i];
            aboveB -= countsB[i];
            belowA += countsA[i];
            belowB += countsB[i];
            best = min(best, min(aboveA + belowB, aboveB + belowA));
        }
        return best;
    }
};
