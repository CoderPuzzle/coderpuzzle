from typing import List


class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        # The prefix cannot outlive the shortest string, so scanning column
        # by column stops exactly at the first position any string disagrees
        # on or ends.
        first = strs[0]
        for column, ch in enumerate(first):
            # A shorter string ending here is as final as a mismatch: nothing
            # can extend the prefix past its last character.
            for s in strs[1:]:
                if column == len(s) or s[column] != ch:
                    return first[:column]
        # Every column of the first string survived every other string.
        return first
