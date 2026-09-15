#include <string>

class Solution {
  public:
    string findLatestTime(string s) {
        // Enumeration per the hint: try every one of the 12 * 60 legal times
        // in ascending order and keep the last pattern match; that last
        // match is the latest obtainable time.
        auto padded = [](int v) {
            string t = to_string(v);
            return t.size() < 2 ? "0" + t : t;
        };
        string best;
        for (int hh = 0; hh < 12; ++hh) {
            for (int mm = 0; mm < 60; ++mm) {
                string candidate = padded(hh) + ":" + padded(mm);
                bool ok = true;
                for (int i = 0; i < 5 && ok; ++i) {
                    if (s[i] != '?' && s[i] != candidate[i])
                        ok = false;
                }
                if (ok)
                    best = candidate;
            }
        }
        return best;
    }
};
