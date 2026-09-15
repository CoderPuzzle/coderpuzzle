class Solution {
  public:
    int countBinaryPalindromes(long long n) {
        // Zero's representation "0" is a palindrome by definition.
        if (n == 0) {
            return 1;
        }
        int length = 0;
        for (long long t = n; t != 0; t >>= 1) {
            ++length;
        }
        // A binary palindrome is fixed by its first ceil(l / 2) bits (the
        // root): the rest mirrors them, sharing the middle bit when l is odd.
        // Every root starts with a 1, so length l carries exactly
        // 2^floor((l - 1) / 2) palindromes, all of them below n. long long
        // keeps n (up to 10^15) and every shifted root in range.
        long long count = 1; // zero itself
        for (int l = 1; l < length; ++l) {
            count += 1LL << ((l - 1) / 2);
        }
        // Palindromes of n's own length ascend with their root, so every
        // root below n's root also lands entirely under n.
        int h = (length + 1) / 2;
        long long root = n >> (length - h);
        count += root - (1LL << (h - 1));
        // The only candidate left is the palindrome built from n's own root;
        // count it when it does not overshoot n.
        int half = length / 2;
        long long rev = 0;
        long long x = root >> (length % 2);
        for (int i = 0; i < half; ++i) {
            rev = (rev << 1) | (x & 1);
            x >>= 1;
        }
        if (((root << half) | rev) <= n) {
            ++count;
        }
        return (int)count;
    }
};
