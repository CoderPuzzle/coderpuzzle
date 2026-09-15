class Solution {

    public int countBinaryPalindromes(long n) {
        // Zero's representation "0" is a palindrome by definition.
        if (n == 0) {
            return 1;
        }
        int length = 0;
        for (long t = n; t != 0; t >>= 1) {
            ++length;
        }
        // A binary palindrome is fixed by its first ceil(l / 2) bits (the
        // root): the rest mirrors them, sharing the middle bit when l is odd.
        // Every root starts with a 1, so length l carries exactly
        // 2^floor((l - 1) / 2) palindromes, all of them below n. The long
        // parameter keeps n (up to 10^15) positive and in range.
        long count = 1; // zero itself
        for (int l = 1; l < length; ++l) {
            count += 1L << ((l - 1) / 2);
        }
        // Palindromes of n's own length ascend with their root, so every
        // root below n's root also lands entirely under n.
        int h = (length + 1) / 2;
        long root = n >> (length - h);
        count += root - (1L << (h - 1));
        // The only candidate left is the palindrome built from n's own root;
        // count it when it does not overshoot n.
        int half = length / 2;
        long rev = 0;
        long x = root >> (length % 2);
        for (int i = 0; i < half; ++i) {
            rev = (rev << 1) | (x & 1);
            x >>= 1;
        }
        if (((root << half) | rev) <= n) {
            ++count;
        }
        return (int) count;
    }
}
