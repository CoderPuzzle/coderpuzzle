class Solution {

    public int minCharacters(String a, String b) {
        // An operation retargets one character anywhere, so only letter
        // counts matter. Condition 3 unifies both strings on one letter
        // c: every character that is not already c pays once. Conditions
        // 1 and 2 share a boundary after letter c — the lower string
        // pays its letters above c, the higher one its letters at or
        // below c — and one sweep with running below/above totals prices
        // both orientations at once. The boundary stops after 'y':
        // nothing can sit above 'z', so 'z' can never cap the lower
        // string.
        int[] countsA = new int[26],
            countsB = new int[26];
        for (int i = 0; i < a.length(); ++i) {
            countsA[a.charAt(i) - 'a']++;
        }
        for (int i = 0; i < b.length(); ++i) {
            countsB[b.charAt(i) - 'a']++;
        }
        int best = a.length() + b.length();
        for (int i = 0; i < 26; ++i) {
            best = Math.min(best, a.length() - countsA[i] + b.length() - countsB[i]);
        }
        int aboveA = a.length(),
            aboveB = b.length(),
            belowA = 0,
            belowB = 0;
        for (int i = 0; i < 25; ++i) {
            aboveA -= countsA[i];
            aboveB -= countsB[i];
            belowA += countsA[i];
            belowB += countsB[i];
            best = Math.min(best, Math.min(aboveA + belowB, aboveB + belowA));
        }
        return best;
    }
}
