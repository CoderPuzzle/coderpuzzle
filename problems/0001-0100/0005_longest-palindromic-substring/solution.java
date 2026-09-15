class Solution {

    public String longestPalindrome(String s) {
        // (0, 0) makes a single character the initial answer, so the
        // returned substring is never empty.
        int n = s.length();
        int bestStart = 0,
            bestEnd = 0;
        for (int i = 0; i < n; i++) {
            // Try both center kinds: (i, i) for odd lengths, (i, i + 1) for
            // even ones; at the last gap the even case fails immediately.
            int[][] centers = { expand(s, i, i), expand(s, i, i + 1) };
            for (int[] c : centers) {
                // Strict > keeps an earlier palindrome on ties, so the
                // leftmost longest one wins ("babad" -> "bab", not "aba").
                if (c[1] - c[0] > bestEnd - bestStart) {
                    bestStart = c[0];
                    bestEnd = c[1];
                }
            }
        }
        return s.substring(bestStart, bestEnd + 1);
    }

    // Walk outward from a center while the two boundary characters match;
    // each expansion step is a single comparison.
    private int[] expand(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        // Overshot by one on each side: back up to the widest palindrome.
        return new int[] { left + 1, right - 1 };
    }
}
