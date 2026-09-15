from typing import List


class Solution:
    def splitWordsBySeparator(self, words: List[str], separator: str) -> List[str]:
        # Split each word at every occurrence of separator and keep the non-empty
        # pieces: leading/trailing separators give empty edge pieces and adjacent
        # ones empty middle pieces; the statement excludes empties, so appending
        # the survivors in walk order yields exactly the required strings.
        result = []
        for word in words:
            for piece in word.split(separator):
                if piece:
                    result.append(piece)
        return result
