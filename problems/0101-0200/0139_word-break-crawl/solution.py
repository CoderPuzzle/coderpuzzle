from typing import List


class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        # Bottom-up DP over prefix reachability: reachable[i] says the first i
        # characters of s split into dictionary words. The empty prefix is
        # reachable, and the answer is reachable[len(s)].
        words = set(wordDict)
        lengths = sorted({len(word) for word in words})
        reachable = [False] * (len(s) + 1)
        reachable[0] = True
        for i in range(1, len(s) + 1):
            for length in lengths:
                if length > i:
                    break
                # Position i ends a word exactly when the prefix before it is
                # reachable and the slice ending here is a dictionary word.
                if reachable[i - length] and s[i - length : i] in words:
                    reachable[i] = True
                    break
        return reachable[len(s)]
