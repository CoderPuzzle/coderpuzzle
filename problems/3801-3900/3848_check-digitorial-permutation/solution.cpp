class Solution {
  public:
    bool isDigitorialPermutation(int n) {
        // The factorial digit sum ignores digit order, so every
        // permutation of n shares one sum s. A digitorial permutation p
        // of n must equal its own factorial digit sum, which is also s,
        // so p = s and p reuses exactly n's digits. Conversely, when s
        // uses exactly n's digits, s itself is a leading-zero-free
        // arrangement of them (s >= 1) and equals its own factorial
        // digit sum. With n <= 10^9, s <= 10 * 9! = 3,628,800, so int
        // arithmetic never overflows.
        int fact[10] = {1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880};
        string digits = to_string(n);
        int s = 0;
        for (char c : digits) {
            s += fact[c - '0'];
        }
        string a = digits;
        string b = to_string(s);
        sort(a.begin(), a.end());
        sort(b.begin(), b.end());
        return a == b;
    }
};
