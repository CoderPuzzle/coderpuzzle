class Solution {
  public:
    bool validPalindrome(string s) {
        // Walk two pointers inward while the outer pairs agree. The first
        // mismatch is the only place a deletion can matter: it must remove
        // one end of the broken pair, so the answer is whether the stretch
        // without the left char or the stretch without the right char is an
        // exact palindrome. An unbroken walk needs no deletion at all.
        int lo = 0, hi = (int)s.size() - 1;
        while (lo < hi) {
            if (s[lo] != s[hi]) {
                return isPalindrome(s, lo + 1, hi) || isPalindrome(s, lo, hi - 1);
            }
            ++lo;
            --hi;
        }
        return true;
    }

  private:
    // Exact palindrome test on the inclusive index range [lo, hi].
    bool isPalindrome(const string &s, int lo, int hi) {
        while (lo < hi) {
            if (s[lo] != s[hi]) {
                return false;
            }
            ++lo;
            --hi;
        }
        return true;
    }
};
