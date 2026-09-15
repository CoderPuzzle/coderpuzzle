from typing import List, Optional


class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        words = set(wordDict)
        n = len(s)
        # reachable[i]: the prefix s[0..i) can be segmented.
        reachable = [False] * (n + 1)
        # The empty prefix is trivially segmentable.
        reachable[0] = True
        for i in range(1, n + 1):
            # Any segmentation of s[0..i) ends with a last word s[j..i).
            for j in range(i):
                if reachable[j] and s[j:i] in words:
                    reachable[i] = True
                    # Only feasibility matters, so stop at the first split.
                    break
        return reachable[n]
