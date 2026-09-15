from typing import List


class Solution:
    def findThePrefixCommonArray(self, A: List[int], B: List[int]) -> List[int]:
        # One shared walk bumps a frequency counter for each value; because
        # both arrays are permutations, a counter reaching 2 means that value
        # now appears in both prefixes, so each hit raises the running total.
        common = 0
        seen = [0] * (len(A) + 1)
        result = []
        for a_value, b_value in zip(A, B):
            seen[a_value] += 1
            if seen[a_value] == 2:
                common += 1
            seen[b_value] += 1
            if seen[b_value] == 2:
                common += 1
            result.append(common)
        return result
