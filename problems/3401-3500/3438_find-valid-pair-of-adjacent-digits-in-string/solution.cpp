class Solution {
  public:
    string findValidPair(string s) {
        // A digit's validity never depends on where it sits, only on how
        // often it occurs in the whole string, so one counting pass settles
        // every question the scan will ask.
        vector<int> counts(10, 0);
        for (char ch : s) {
            counts[ch - '0']++;
        }
        for (int i = 0; i + 1 < (int)s.size(); ++i) {
            int a = s[i] - '0';
            int b = s[i + 1] - '0';
            // Valid when the digits differ and each occurs exactly as many
            // times as its numeric value.
            if (a != b && counts[a] == a && counts[b] == b) {
                return s.substr(i, 2);
            }
        }
        return "";
    }
};
