class Solution {

    public int vowelConsonantScore(String s) {
        // One pass tallies both totals: each character either is one of
        // the five vowels and bumps v, is another lowercase letter and
        // bumps c, or is a space or digit and bumps neither. The score is
        // then the integer quotient floor(v / c), or 0 when no consonant
        // exists to divide by.
        int v = 0;
        int c = 0;
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
                v++;
            } else if (ch >= 'a' && ch <= 'z') {
                c++;
            }
        }
        return c > 0 ? v / c : 0;
    }
}
