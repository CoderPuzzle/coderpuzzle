class Solution:
    def canConstruct(self, s: str, k: int) -> bool:
        # Splitting all of s across k palindromes needs one character per
        # string at minimum, and every letter with an odd count must anchor
        # the center of a different palindrome. Both bounds are achievable
        # simultaneously, so checking them is enough.
        if len(s) < k:
            return False
        counts = [0] * 26
        for ch in s:
            counts[ord(ch) - ord("a")] += 1
        odd = sum(1 for count in counts if count % 2 == 1)
        return odd <= k
