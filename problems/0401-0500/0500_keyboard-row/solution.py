from typing import List


class Solution:
    def findWords(self, words: List[str]) -> List[str]:
        # One map from each letter to its keyboard row 0, 1 or 2, built once
        # from the three row listings: both cases of a letter land in the same
        # bucket, which is the whole case-insensitivity story.
        row_of = {}
        for row, letters in enumerate(("qwertyuiop", "asdfghjkl", "zxcvbnm")):
            for ch in letters:
                row_of[ch] = row
                row_of[ch.upper()] = row
        result: List[str] = []
        for word in words:
            # A word is typeable on one row iff no letter ever leaves the row
            # its first letter already fixed; the word keeps its own casing.
            first_row = row_of[word[0]]
            if all(row_of[ch] == first_row for ch in word):
                result.append(word)
        return result
