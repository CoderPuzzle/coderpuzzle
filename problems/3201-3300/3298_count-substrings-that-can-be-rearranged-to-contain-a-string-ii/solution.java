import java.util.Arrays;

class Solution {

    public long validSubstringCount(String word1, String word2) {
        // A window is valid exactly when its counts cover word2's counts.
        // Track how many required characters are still `missing`; when it
        // hits zero every extension r' >= r of the current right end works,
        // contributing n - r windows for this left end. The minimal right
        // end never decreases as l advances, so each character enters and
        // leaves the window once — linear overall.
        int n = word1.length();
        int[] need = new int[26];
        for (int i = 0; i < word2.length(); i++) {
            need[word2.charAt(i) - 'a']++;
        }
        int missing = 0;
        for (int c = 0; c < 26; c++) {
            missing += need[c];
        }
        int[] have = new int[26];
        Arrays.fill(have, 0);
        long total = 0L;
        int r = 0;
        for (int l = 0; l < n; l++) {
            // Grow the window until it first covers word2.
            while (r < n && missing > 0) {
                int c = word1.charAt(r) - 'a';
                have[c]++;
                if (need[c] > 0 && have[c] <= need[c]) {
                    missing--;
                }
                r++;
            }
            if (
                missing > 0 // No window starting at l (or any later l) can cover word2.
            ) break;
            total += (long) (n - (r - 1));
            // Drop word1[l] before moving to the next left end.
            int c = word1.charAt(l) - 'a';
            have[c]--;
            if (need[c] > 0 && have[c] < need[c]) {
                missing++;
            }
        }
        return total;
    }
}
