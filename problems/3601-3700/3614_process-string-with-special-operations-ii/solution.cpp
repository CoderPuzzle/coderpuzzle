class Solution {
  public:
    string processStr(string s, long long k) {
        // First pass: the length of the result after each prefix. '#' doubles
        // it, '*' drops one (never below zero), a letter adds one, '%' leaves
        // it untouched. The result can reach 10^15 characters, so the string
        // itself is never built - only these lengths are kept.
        int n = (int)s.size();
        vector<long long> length(n + 1, 0);
        for (int i = 0; i < n; ++i) {
            char ch = s[i];
            if (ch == '*') {
                length[i + 1] = max(0LL, length[i] - 1);
            } else if (ch == '#') {
                length[i + 1] = length[i] * 2;
            } else if (ch == '%') {
                length[i + 1] = length[i];
            } else {
                length[i + 1] = length[i] + 1;
            }
        }
        if (k >= length[n]) {
            return ".";
        }
        // Walk backwards, undoing each operation to map position k of the
        // final string back to the letter that produced it. The length array
        // pins down where each duplication and reversal boundary sits, so
        // every step is arithmetic, not string work.
        long long pos = k;
        for (int i = n - 1; i >= 0; --i) {
            char ch = s[i];
            if (ch == '*') {
                // Removing the tail keeps every earlier position.
            } else if (ch == '#') {
                long long half = length[i];
                if (pos >= half) {
                    pos -= half;
                }
            } else if (ch == '%') {
                pos = length[i] - 1 - pos;
            } else if (pos == length[i]) {
                return string(1, ch);
            }
        }
        return ".";
    }
};
