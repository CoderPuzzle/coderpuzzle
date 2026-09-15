class Solution {
  public:
    bool areAlmostEqual(string s1, string s2) {
        // One swap repairs exactly two positions, and only when their
        // characters are crossed between the two strings.
        size_t i = string::npos;
        size_t j = string::npos;
        for (size_t k = 0; k < s1.size(); k++) {
            if (s1[k] != s2[k]) {
                if (i == string::npos) {
                    i = k;
                } else if (j == string::npos) {
                    j = k;
                } else {
                    return false;
                }
            }
        }
        if (j == string::npos) {
            return i == string::npos;
        }
        return s1[i] == s2[j] && s1[j] == s2[i];
    }
};
