class Solution {

    public String freqAlphabets(String s) {
        // A '#' disambiguates backwards, so scan from the right: at each
        // position either a '#' sits two places ahead (three-char token) or
        // the digit stands alone as a single letter.
        StringBuilder out = new StringBuilder();
        int i = s.length() - 1;
        while (i >= 0) {
            int value;
            if (s.charAt(i) == '#') {
                value = (s.charAt(i - 2) - '0') * 10 + (s.charAt(i - 1) - '0');
                i -= 3;
            } else {
                value = s.charAt(i) - '0';
                i -= 1;
            }
            out.append((char) ('a' + value - 1));
        }
        return out.reverse().toString();
    }
}
