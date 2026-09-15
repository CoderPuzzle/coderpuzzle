class Solution {
  public:
    string reverseWords(string s) {
        // C++ strings are mutable, so this is the true in-place pass the
        // statement asks for: flip the whole line once, then re-flip each word.
        reverse(s.begin(), s.end());
        int n = (int)s.size(), start = 0;
        for (int stop = 0; stop <= n; ++stop) {
            // A word ends at each separating space (and at the end of the line).
            if (stop == n || s[stop] == ' ') {
                // The word still carries the whole-reverse's letter flip;
                // restore it with its own flip.
                reverse(s.begin() + start, s.begin() + stop);
                start = stop + 1;
            }
        }
        return s;
    }
};
