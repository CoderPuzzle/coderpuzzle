class Solution {
  public:
    bool validWordAbbreviation(string word, string abbr) {
        // Two indexes walk word and abbr together: a letter must match
        // exactly, a digit run is one skip, and both walks must end together.
        int i = 0, j = 0;
        while (i < (int)word.size() && j < (int)abbr.size()) {
            char c = abbr[j];
            if (c >= '0' && c <= '9') {
                // A digit run may not open with '0': that is a leading zero
                // (and a zero skip would replace an empty substring).
                if (c == '0') {
                    return false;
                }
                int skip = 0;
                // Consume the whole run: "12" and "55" are single skips, so
                // adjacent replacements can never masquerade as two.
                while (j < (int)abbr.size() && abbr[j] >= '0' && abbr[j] <= '9') {
                    skip = skip * 10 + (abbr[j] - '0');
                    j++;
                }
                i += skip;
            } else {
                if (word[i] != c) {
                    return false;
                }
                i++;
                j++;
            }
        }
        // A skip past the end, leftover word, or leftover abbr all fail here.
        return i == (int)word.size() && j == (int)abbr.size();
    }
};
