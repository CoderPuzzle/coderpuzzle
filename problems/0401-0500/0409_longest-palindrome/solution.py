class Solution:
    def longestPalindrome(self, s: str) -> int:
        # A palindrome's wings mirror, so every letter it uses must pair
        # with a same-letter partner on the other side — one slot per
        # letter, lowercase and uppercase separate because case matters.
        counts = [0] * 52
        for ch in s:
            if ch <= "Z":
                counts[ord(ch) - ord("A")] += 1
            else:
                counts[26 + ord(ch) - ord("a")] += 1
        # Pairs contribute one letter to each wing; at most one unpaired
        # letter can occupy the center, so add 1 exactly when some count
        # is odd and leave every other leftover unused.
        pairs = 0
        has_odd = False
        for count in counts:
            pairs += count // 2
            if count % 2 == 1:
                has_odd = True
        return pairs * 2 + (1 if has_odd else 0)
