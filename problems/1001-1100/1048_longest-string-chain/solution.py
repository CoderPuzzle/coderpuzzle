from typing import List, Optional


class Solution:
    def longestStrChain(self, words: List[str]) -> int:
        # Process shortest first; a word's chain extends from any predecessor
        # formed by deleting one character.
        dp = {}
        best = 0
        for word in sorted(set(words), key=len):
            current = 1
            for i in range(len(word)):
                predecessor = word[:i] + word[i + 1 :]
                if predecessor in dp and dp[predecessor] + 1 > current:
                    current = dp[predecessor] + 1
            dp[word] = current
            if current > best:
                best = current
        return best
