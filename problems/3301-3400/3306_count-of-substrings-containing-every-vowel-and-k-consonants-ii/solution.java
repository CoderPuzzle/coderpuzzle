import java.util.Arrays;

class Solution {

    public long countOfSubstrings(String word, int k) {
        // Count windows with all five vowels and >= c consonants, for c = k
        // and c = k + 1; their difference is the number with exactly k
        // consonants. For each left end l, grow r until the window first
        // qualifies; that minimal right end never moves backwards, so every
        // character enters and leaves the window once — linear overall.
        return atLeast(word, k) - atLeast(word, k + 1);
    }

    private long atLeast(String word, int need) {
        int n = word.length();
        int[] have = new int[5];
        Arrays.fill(have, 0);
        int distinct = 0;
        int cons = 0;
        long total = 0L;
        int r = 0;
        for (int l = 0; l < n; l++) {
            // Grow the window until it has every vowel and >= need consonants.
            while (r < n && (distinct < 5 || cons < need)) {
                int v = "aeiou".indexOf(word.charAt(r));
                if (v >= 0) {
                    if (have[v]++ == 0) distinct++;
                } else {
                    cons++;
                }
                r++;
            }
            if (
                distinct < 5 ||
                cons < need // No window starting at l (or any later l) can qualify.
            ) break;
            total += (long) (n - (r - 1));
            // Drop word[l] before moving to the next left end.
            int v = "aeiou".indexOf(word.charAt(l));
            if (v >= 0) {
                if (--have[v] == 0) distinct--;
            } else {
                cons--;
            }
        }
        return total;
    }
}
