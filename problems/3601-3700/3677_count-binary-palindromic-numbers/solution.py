class Solution:
    def countBinaryPalindromes(self, n: int) -> int:
        # Zero's representation "0" is a palindrome by definition.
        if n == 0:
            return 1
        length = 0
        t = n
        while t:
            t >>= 1
            length += 1
        # A binary palindrome is fixed by its first ceil(l / 2) bits (the
        # root): the rest mirrors them, sharing the middle bit when l is odd.
        # Every root starts with a 1, so length l carries exactly
        # 2^floor((l - 1) / 2) palindromes, all of them below n.
        count = 1  # zero itself
        for l in range(1, length):
            count += 1 << ((l - 1) // 2)
        # Palindromes of n's own length ascend with their root, so every
        # root below n's root also lands entirely under n.
        h = (length + 1) // 2
        root = n >> (length - h)
        count += root - (1 << (h - 1))
        # The only candidate left is the palindrome built from n's own root;
        # count it when it does not overshoot n.
        half = length // 2
        rev = 0
        x = root >> (length % 2)
        for _ in range(half):
            rev = (rev << 1) | (x & 1)
            x >>= 1
        if ((root << half) | rev) <= n:
            count += 1
        return count
