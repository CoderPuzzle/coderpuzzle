class Solution {
  public:
    int largestPalindrome(int n) {
        // Every 2-digit palindrome is a multiple of 11, which no product of
        // two 1-digit factors can be, so the answer is the palindrome 9 = 3 * 3.
        if (n == 1)
            return 9;
        long long top = 1;
        for (int i = 0; i < n; ++i)
            top *= 10;
        long long hi = top - 1, lo = top / 10;
        // A 2n-digit palindrome is fixed by its first half: enumerate halves
        // downward, so the first candidate that factors is the largest.
        for (long long half = hi; half >= lo; --half) {
            string text = to_string(half);
            string mirrored(text.rbegin(), text.rend());
            long long palindrome = stoll(text + mirrored);
            // Long double sqrt rounds at this width, so settle the floor exactly.
            long long root = (long long)sqrtl((long double)palindrome);
            while (root * root > palindrome)
                --root;
            while ((root + 1) * (root + 1) <= palindrome)
                ++root;
            // The larger factor of any pair lies between hi and the integer
            // square root; the cofactor check rejects pairs whose cofactor runs
            // a digit long.
            for (long long factor = hi; factor >= root; --factor) {
                if (palindrome % factor == 0) {
                    long long other = palindrome / factor;
                    if (other >= lo && other <= hi)
                        return (int)(palindrome % 1337);
                }
            }
        }
        // Every width from 2 up has a palindromic product; this is only the
        // exit the compiler needs.
        return 0;
    }
};
