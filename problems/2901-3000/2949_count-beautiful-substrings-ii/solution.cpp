class Solution {
  public:
    bool isVowel(char c) { return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u'; }
    int beautifulSubstrings(string s, int k) {
        // A beautiful substring has equal vowels and consonants (the
        // prefix vowel-minus-consonant balance is equal at both ends) and
        // with both counts equal to x, x*x % k == 0 holds exactly when x
        // is a multiple of m, the least x >= 1 with x*x % k == 0 — for
        // k = p1^a1 * p2^a2 * ... that is the product of p^ceil(a/2). So
        // a substring counts iff its end balances match and its length is
        // a multiple of 2m, i.e. both end indices agree modulo 2m. One
        // pass counts earlier prefixes with the same (balance, index mod
        // 2m) key.
        int m = 1, rest = k;
        for (int p = 2; p * p <= rest; p++) {
            if (rest % p == 0) {
                int a = 0;
                while (rest % p == 0) {
                    rest /= p;
                    a++;
                }
                for (int t = 0; t < (a + 1) / 2; t++)
                    m *= p;
            }
        }
        if (rest > 1)
            m *= rest;
        int period = 2 * m;
        int n = s.size();
        unordered_map<long long, long long> seen;
        seen[(long long)n * period] = 1; // empty prefix: balance 0, index 0
        long long total = 0;
        int balance = 0;
        for (int i = 1; i <= n; i++) {
            balance += isVowel(s[i - 1]) ? 1 : -1;
            long long key = (long long)(balance + n) * period + (i % period);
            long long &slot = seen[key];
            total += slot;
            slot += 1;
        }
        return (int)total;
    }
};
