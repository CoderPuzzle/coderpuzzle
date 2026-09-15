class Solution {
  public:
    bool isSubstringPresent(string s) {
        // A length-2 substring of s shows up in reverse(s) exactly when its
        // own reversal shows up somewhere in s, since reading s backwards
        // turns every adjacent pair xy into yx. One pass records each pair
        // in a set and looks the current pair up flipped — a hit on yx
        // means an earlier xy mirrors into it, and a later yx finds the xy
        // recorded before it. A doubled letter is its own reversal, so xx
        // matches the moment it appears.
        unordered_set<string> seen;
        for (size_t i = 0; i + 1 < s.size(); i++) {
            if (s[i] == s[i + 1] || seen.count(s.substr(i + 1, 1) + s.substr(i, 1))) {
                return true;
            }
            seen.insert(s.substr(i, 2));
        }
        return false;
    }
};
