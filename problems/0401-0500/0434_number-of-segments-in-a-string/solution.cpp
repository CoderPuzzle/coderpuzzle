class Solution {
  public:
    int countSegments(string s) {
        // A segment starts exactly where a non-space character follows a
        // space — or where the string itself begins — so counting segments
        // is counting their first characters.
        int count = 0;
        // One left-to-right pass tests that boundary condition at every
        // position: leading, trailing, and repeated interior spaces never
        // register, and an empty string offers no position at all.
        for (int i = 0; i < (int)s.size(); ++i) {
            if (s[i] != ' ' && (i == 0 || s[i - 1] == ' ')) {
                ++count;
            }
        }
        return count;
    }
};
