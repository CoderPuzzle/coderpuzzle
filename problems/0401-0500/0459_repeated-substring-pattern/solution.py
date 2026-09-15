class Solution:
    def repeatedSubstringPattern(self, s: str) -> bool:
        # Only a proper divisor length can work: the block must divide n and
        # be shorter than it, so s is at least two copies of the block.
        n = len(s)
        for d in range(1, n // 2 + 1):
            if n % d == 0 and s == s[:d] * (n // d):
                return True
        return False
