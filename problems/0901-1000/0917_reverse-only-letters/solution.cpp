class Solution {
  public:
    // Explicit byte ranges, both cases named: the constraint alphabet is pure
    // ASCII, so a range check on the char code is exact.
    static bool isLetter(char c) { return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z'); }

    string reverseOnlyLetters(string s) {
        // C++ strings are mutable, so this is the true in-place scan: two
        // pointers walk inward and only letter positions are ever written.
        int lo = 0, hi = (int)s.size() - 1;
        while (lo < hi) {
            // Advance whichever side does not sit on a letter.
            if (!isLetter(s[lo])) {
                lo++;
            } else if (!isLetter(s[hi])) {
                hi--;
            } else {
                // Both ends hold a letter: swap them and step both inward.
                swap(s[lo++], s[hi--]);
            }
        }
        return s;
    }
};
