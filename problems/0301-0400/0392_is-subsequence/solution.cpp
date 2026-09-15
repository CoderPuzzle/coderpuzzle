class Solution {
  public:
    bool isSubsequence(string s, string t) {
        // Walk t once, advancing a pointer into s on every match; greedy is
        // safe — matching each character at its earliest legal position in t
        // never hurts a later one.
        int i = 0;
        for (char ch : t) {
            if (i < (int)s.size() && ch == s[i]) {
                i++;
            }
        }
        // All of s was matched in order iff the pointer reached its end.
        return i == (int)s.size();
    }
};
