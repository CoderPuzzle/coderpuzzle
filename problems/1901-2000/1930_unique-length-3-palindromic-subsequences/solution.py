from typing import List, Optional


class Solution:
    def countPalindromicSubsequence(self, s: str) -> int:
        count = 0
        for code in range(ord("a"), ord("z") + 1):
            ch = chr(code)
            # Palindrome ch-y-ch exists iff some y sits strictly between the
            # first and last occurrence of ch: anchoring the outers at the
            # outermost occurrences is the most permissive choice.
            first = s.find(ch)
            last = s.rfind(ch)
            if first != -1 and last - first >= 2:
                # Distinct chars only (a set, not positions) so each
                # palindrome is counted once despite repeated middle letters.
                count += len(set(s[first + 1 : last]))
        return count
