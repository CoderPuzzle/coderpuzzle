from typing import List


class Solution:
    def numOfStrings(self, patterns: List[str], word: str) -> int:
        # Each pattern is judged on its own: count the ones that occur as
        # a contiguous substring of word.
        return sum(1 for pattern in patterns if pattern in word)
