from typing import List, Optional


class Solution:
    def numDifferentIntegers(self, word: str) -> int:
        # A digit run can be up to 1000 digits long, far beyond any
        # fixed-width integer, so runs are never parsed: each is stripped
        # of leading zeros and compared as a string in a hash set. The
        # strip loop keeps one digit, so an all-zero run stays "0".
        seen = set()
        n = len(word)
        i = 0
        while i < n:
            c = word[i]
            if not ("0" <= c <= "9"):
                i += 1
                continue
            j = i
            while j < n and "0" <= word[j] <= "9":
                j += 1
            k = i
            while k + 1 < j and word[k] == "0":
                k += 1
            seen.add(word[k:j])
            i = j
        return len(seen)
