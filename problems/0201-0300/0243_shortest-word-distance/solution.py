from typing import List


class Solution:
    def shortestDistance(self, wordsDict: List[str], word1: str, word2: str) -> int:
        # One pass remembering the most recent position of each word. The
        # statement guarantees word1 != word2, so no element is ever both.
        index1 = -1
        index2 = -1
        # The two words sit at distinct indices, so no real gap reaches the
        # length of the list — it is a safe unreachable starting bound.
        best = len(wordsDict)
        for index, word in enumerate(wordsDict):
            if word == word1:
                index1 = index
            elif word == word2:
                index2 = index
            if index1 >= 0 and index2 >= 0:
                # A fresh occurrence is closest to the latest opposite
                # occurrence behind it; older ones lie farther back, so this
                # single gap is the only candidate the new occurrence adds.
                best = min(best, abs(index1 - index2))
        return best
