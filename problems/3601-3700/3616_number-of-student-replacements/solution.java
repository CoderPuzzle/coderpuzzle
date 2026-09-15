class Solution {

    public int totalReplacements(int[] ranks) {
        // One sweep: best is the smallest rank seen so far. A strictly
        // better (lower) arrival displaces it and counts as a replacement;
        // equal or worse ranks leave the selection untouched.
        int best = ranks[0];
        int replacements = 0;
        for (int i = 1; i < ranks.length; i++) {
            if (ranks[i] < best) {
                best = ranks[i];
                replacements++;
            }
        }
        return replacements;
    }
}
