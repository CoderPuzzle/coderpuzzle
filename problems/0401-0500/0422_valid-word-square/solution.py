from typing import List


class Solution:
    def validWordSquare(self, words: List[str]) -> bool:
        # A word square mirrors across its diagonal with absence counted:
        # the character at (i, j) demands a same-character mirror at
        # (j, i), so row j must exist at all and reach back to column i.
        count = len(words)
        for i, row in enumerate(words):
            for j, ch in enumerate(row):
                if j >= count or i >= len(words[j]) or words[j][i] != ch:
                    return False
        return True
