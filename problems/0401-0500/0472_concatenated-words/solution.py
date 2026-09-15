from typing import List, Optional


class Solution:
    def findAllConcatenatedWordsInADict(self, words: List[str]) -> List[str]:
        dictionary = set(words)

        def is_concatenated(word):
            n = len(word)
            # Word-break DP: dp[i] = the first i chars split entirely into
            # dictionary words (dp[0] = empty prefix).
            dp = [False] * (n + 1)
            dp[0] = True
            for i in range(1, n + 1):
                for j in range(i):
                    # Excluding the whole-word split forces >= 2 pieces; only
                    # proper substrings are looked up, so the unfiltered set
                    # of all words is safe.
                    if j == 0 and i == n:
                        continue  # the word itself does not count as a part
                    if dp[j] and word[j:i] in dictionary:
                        # One valid split per position suffices.
                        dp[i] = True
                        break
            return dp[n]

        return [word for word in words if is_concatenated(word)]
