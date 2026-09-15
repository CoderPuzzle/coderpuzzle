class Solution {
  public:
    long long countSubstrings(string s, string c) {
        // Only the positions of c matter: a substring starts and ends with
        // c exactly when both endpoints land on an occurrence, so choosing
        // a substring is choosing two (not necessarily distinct)
        // occurrences, in order. With m occurrences that is m*(m+1)/2
        // pairs, which can reach 5000050000 at n = 100000 — beyond 32-bit,
        // so the count and the product both live in long long.
        long long m = 0;
        for (size_t i = 0; i < s.size(); i++) {
            if (s[i] == c[0]) {
                m++;
            }
        }
        return m * (m + 1) / 2;
    }
};
