class Solution {
  public:
    bool queryString(string s, int n) {
        // 10^9 fits in 30 bits, so every i in [1, n] has a short binary
        // form; checking each one as a substring of s directly answers
        // the question.
        for (int i = 1; i <= n; i++) {
            string bin;
            int x = i;
            while (x > 0) {
                bin = char('0' + (x & 1)) + bin;
                x >>= 1;
            }
            if (s.find(bin) == string::npos) {
                return false;
            }
        }
        return true;
    }
};
