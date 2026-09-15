class Solution {
  public:
    string stringHash(string s, int k) {
        // The chunks are the fixed windows of k characters because n is a
        // multiple of k: each pass reads one window, adds up its characters'
        // alphabet indices, and appends the letter at index sum % 26. The
        // running total never exceeds 25 * 100 = 2500, so ordinary integers
        // suffice, and one linear pass visits every character exactly once.
        string result;
        result.reserve(s.size() / k);
        for (int base = 0; base < (int)s.size(); base += k) {
            int total = 0;
            for (int j = base; j < base + k; ++j) {
                total += s[j] - 'a';
            }
            result += static_cast<char>('a' + total % 26);
        }
        return result;
    }
};
