class Solution {
  public:
    string longestNiceSubstring(string s) {
        // A character missing its case-partner anywhere in the string
        // can never sit inside a nice window: split on every offender
        // and recurse. Segments with no offenders are entirely nice.
        if (s.size() < 2) {
            return "";
        }
        int mask = 0;
        for (char c : s) {
            mask |= 1 << (islower(c) ? c - 'a' : c - 'A');
        }
        for (int i = 0; i < (int)s.size(); i++) {
            char c = s[i];
            int bit = 1 << (islower(c) ? c - 'a' : c - 'A');
            if ((mask & bit) == 0) {
                continue;
            }
            char other = islower(c) ? toupper(c) : tolower(c);
            bool otherPresent = false;
            for (char o : s) {
                if (o == other) {
                    otherPresent = true;
                    break;
                }
            }
            if (!otherPresent) {
                string left = longestNiceSubstring(s.substr(0, i));
                string right = longestNiceSubstring(s.substr(i + 1));
                return left.size() >= right.size() ? left : right;
            }
        }
        return s;
    }
};
