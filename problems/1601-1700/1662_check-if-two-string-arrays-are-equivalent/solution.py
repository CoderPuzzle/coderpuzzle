from typing import List


class Solution:
    def arrayStringsAreEqual(self, word1: List[str], word2: List[str]) -> bool:
        # Walk both arrays with an array index plus an offset inside the
        # current element: the two concatenated streams are compared one
        # character at a time, never materialized.
        array1 = offset1 = 0
        array2 = offset2 = 0
        while array1 < len(word1) and array2 < len(word2):
            if word1[array1][offset1] != word2[array2][offset2]:
                return False
            offset1 += 1
            if offset1 == len(word1[array1]):
                array1 += 1
                offset1 = 0
            offset2 += 1
            if offset2 == len(word2[array2]):
                array2 += 1
                offset2 = 0
        # Equal only if both walks exhausted together: an unfinished array
        # means its concatenation is strictly longer.
        return array1 == len(word1) and array2 == len(word2)
