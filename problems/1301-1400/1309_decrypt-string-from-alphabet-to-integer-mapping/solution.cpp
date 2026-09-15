class Solution {
  public:
    string freqAlphabets(string &s) {
        // A '#' disambiguates backwards, so scan from the right: at each
        // position either a '#' sits two places ahead (three-char token) or
        // the digit stands alone as a single letter.
        string out;
        int i = (int)s.size() - 1;
        while (i >= 0) {
            int value;
            if (s[i] == '#') {
                value = (s[i - 2] - '0') * 10 + (s[i - 1] - '0');
                i -= 3;
            } else {
                value = s[i] - '0';
                i -= 1;
            }
            out.push_back((char)('a' + value - 1));
        }
        reverse(out.begin(), out.end());
        return out;
    }
};
