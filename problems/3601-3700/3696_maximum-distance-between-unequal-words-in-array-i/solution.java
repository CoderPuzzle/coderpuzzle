class Solution {

    public int maxDistance(String[] words) {
        // Starting best at 0 bakes in the sentinel: only a genuinely
        // unequal pair can raise it, so an all-equal array (or a single
        // word, which has no pairs at all) returns 0 untouched.
        int best = 0;
        int n = words.length;
        // Check every index pair once; each unequal pair contributes
        // j - i + 1, counting both endpoints. String equality goes
        // through equals(), never ==, which compares references.
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (!words[i].equals(words[j])) {
                    best = Math.max(best, j - i + 1);
                }
            }
        }
        return best;
    }
}
