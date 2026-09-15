from typing import List


class Solution:
    def shortestWordDistance(self, wordsDict: List[str], word1: str, word2: str) -> int:
        # One pass remembering the most recent position of each word. Here
        # word1 and word2 may be the same word, and that case is the twist.
        same = word1 == word2
        index1 = -1
        index2 = -1
        # The two queried words occupy two distinct indices, so no real gap
        # reaches the length of the list — it is a safe unreachable bound.
        best = len(wordsDict)
        for index, word in enumerate(wordsDict):
            if word == word1:
                if same:
                    # Equal words: the previous occurrence now plays the
                    # counterpart, so only gaps between consecutive
                    # occurrences of the one word are ever compared.
                    index2 = index1
                index1 = index
            elif word == word2:
                index2 = index
            if index1 >= 0 and index2 >= 0:
                # A fresh occurrence is closest to the latest occurrence
                # behind it; older ones lie farther back, so this single gap
                # is the only candidate the new occurrence adds.
                best = min(best, abs(index1 - index2))
        return best
