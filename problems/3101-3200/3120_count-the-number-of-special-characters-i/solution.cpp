class Solution {
  public:
    int numberOfSpecialChars(string word) {
        // A letter is special iff both of its cases occur somewhere; mark
        // the two 26-slot case flags in one pass, then count full pairs.
        vector<bool> lower(26, false), upper(26, false);
        for (char ch : word) {
            if (ch >= 'a') {
                lower[ch - 'a'] = true;
            } else {
                upper[ch - 'A'] = true;
            }
        }
        int count = 0;
        for (int k = 0; k < 26; k++) {
            if (lower[k] && upper[k]) {
                count++;
            }
        }
        return count;
    }
};
