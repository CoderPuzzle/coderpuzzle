class Solution {
  public:
    bool repeatedSubstringPattern(string s) {
        // Only a proper divisor length can work: the block must divide n and
        // be shorter than it, so s is at least two copies of the block.
        int n = (int)s.size();
        for (int d = 1; d <= n / 2; ++d) {
            if (n % d != 0) {
                continue;
            }
            string built;
            for (int k = 0; k < n / d; ++k) {
                built += s.substr(0, d);
            }
            if (built == s) {
                return true;
            }
        }
        return false;
    }
};
