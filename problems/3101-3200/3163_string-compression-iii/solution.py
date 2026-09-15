from typing import List, Optional


class Solution:
    def compressedString(self, word: str) -> str:
        # One sweep over the runs of equal characters, slicing each run
        # into chunks of at most nine because that is all one operation may
        # remove -- a length-14 run therefore encodes as "9c5c".
        parts = []
        i = 0
        n = len(word)
        while i < n:
            j = i
            while j < n and word[j] == word[i] and j - i < 9:
                j += 1
            parts.append(str(j - i))
            parts.append(word[i])
            i = j
        return "".join(parts)
