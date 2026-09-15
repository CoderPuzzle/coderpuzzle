class Solution {
  public:
    string reverseWords(string s) {
        // C++ strings are mutable, so this is the true in-place scan: the
        // word boundaries are located with one pass and only word positions
        // are ever written.
        int n = (int)s.size();
        int start = 0;
        while (start < n) {
            int end = start;
            while (end < n && s[end] != ' ') {
                end++;
            }
            // s[start..end) is one word: reverse it with two pointers.
            int lo = start, hi = end - 1;
            while (lo < hi) {
                swap(s[lo++], s[hi--]);
            }
            start = end + 1;
        }
        return s;
    }
};
