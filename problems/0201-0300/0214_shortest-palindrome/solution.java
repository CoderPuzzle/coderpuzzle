class Solution {

    public String shortestPalindrome(String s) {
        String rev = new StringBuilder(s).reverse().toString();
        // A prefix of s is a palindrome exactly when it equals a suffix of
        // rev, so the KMP prefix function over s + "#" + rev finds it. The
        // separator character (absent from s) keeps the border from
        // stretching across the join and exceeding s.length().
        String combined = s + "#" + rev;
        int n = combined.length();
        int[] lps = new int[n];
        for (int i = 1; i < n; i++) {
            // j is the border length of the previous position: shrink through
            // lps[j-1] on mismatch, extend by one on match — linear overall.
            int j = lps[i - 1];
            while (j > 0 && combined.charAt(i) != combined.charAt(j)) {
                j = lps[j - 1];
            }
            if (combined.charAt(i) == combined.charAt(j)) {
                j++;
            }
            lps[i] = j;
        }
        // The last entry is the longest proper border: the palindromic
        // prefix length.
        int palLen = n > 0 ? lps[n - 1] : 0;
        // Mirror only the non-palindromic tail onto the front.
        return rev.substring(0, s.length() - palLen) + s;
    }
}
