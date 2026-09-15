class Solution {

    public boolean validWordAbbreviation(String word, String abbr) {
        // Two indexes walk word and abbr together: a letter must match
        // exactly, a digit run is one skip, and both walks must end together.
        int i = 0,
            j = 0;
        while (i < word.length() && j < abbr.length()) {
            char c = abbr.charAt(j);
            if (c >= '0' && c <= '9') {
                // A digit run may not open with '0': that is a leading zero
                // (and a zero skip would replace an empty substring).
                if (c == '0') {
                    return false;
                }
                int skip = 0;
                // Consume the whole run: "12" and "55" are single skips, so
                // adjacent replacements can never masquerade as two.
                while (j < abbr.length() && abbr.charAt(j) >= '0' && abbr.charAt(j) <= '9') {
                    skip = skip * 10 + (abbr.charAt(j) - '0');
                    j++;
                }
                i += skip;
            } else {
                if (word.charAt(i) != c) {
                    return false;
                }
                i++;
                j++;
            }
        }
        // A skip past the end, leftover word, or leftover abbr all fail here.
        return i == word.length() && j == abbr.length();
    }
}
