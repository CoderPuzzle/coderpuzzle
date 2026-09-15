from typing import List


class Solution:
    def findWordsContaining(self, words: List[str], x: str) -> List[int]:
        # A word qualifies exactly when x occurs in it; Python's substring
        # test answers that in one call, so a single pass over words with
        # enumerate collects the indices in order.
        return [i for i, word in enumerate(words) if x in word]
