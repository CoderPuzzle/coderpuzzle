from typing import List


class Solution:
    def getLongestSubsequence(self, words: List[str], groups: List[int]) -> List[str]:
        # Taking the first element of every maximal run of equal group values
        # pins one deterministic answer out of the many the statement permits.
        result = [words[0]]
        for i in range(1, len(groups)):
            if groups[i] != groups[i - 1]:
                result.append(words[i])
        return result
