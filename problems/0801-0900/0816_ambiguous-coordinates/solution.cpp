class Solution {
  public:
    vector<string> ambiguousCoordinates(string s) {
        string t = s.substr(1, s.size() - 2);
        vector<string> result;
        for (int i = 1; i < (int)t.size(); ++i) {
            vector<string> lefts = forms(t.substr(0, i));
            if (lefts.empty()) {
                continue;
            }
            vector<string> rights = forms(t.substr(i));
            if (rights.empty()) {
                continue;
            }
            for (const string &a : lefts) {
                for (const string &b : rights) {
                    result.push_back("(" + a + ", " + b + ")");
                }
            }
        }
        return result;
    }

  private:
    // Every valid rendering of the digit run t, in the statement's pinned
    // order: decimal forms first, point moving right, then the plain integer
    // last.
    vector<string> forms(const string &t) {
        vector<string> out;
        for (int k = 1; k < (int)t.size(); ++k) {
            string whole = t.substr(0, k);
            string frac = t.substr(k);
            // The whole part may not open with '0' unless it is exactly "0",
            // and the fractional part may not end in '0'.
            if (whole.size() > 1 && whole[0] == '0') {
                continue;
            }
            if (frac.back() == '0') {
                continue;
            }
            out.push_back(whole + "." + frac);
        }
        if (t.size() == 1 || t[0] != '0') {
            out.push_back(t);
        }
        return out;
    }
};
