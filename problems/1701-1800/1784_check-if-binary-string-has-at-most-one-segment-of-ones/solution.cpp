class Solution {
  public:
    bool checkOnesSegment(string s) {
        // A segment is a maximal run of ones; a new one starts wherever
        // a '1' follows a '0'. Bail out as soon as a second starts.
        int segments = 0;
        for (int i = 0; i < (int)s.size(); i++) {
            if (s[i] == '1' && (i == 0 || s[i - 1] == '0')) {
                segments++;
                if (segments > 1) {
                    return false;
                }
            }
        }
        return true;
    }
};
