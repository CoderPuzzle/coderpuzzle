from typing import List


class Solution:
    def findErrorNums(self, nums: List[int]) -> List[int]:
        # The values in nums are the numbers 1..n with one value doubled and
        # one lost, so counting occurrences settles both questions at once:
        # slot v of a count array indexed by value holds 2 for the
        # duplicated value and 0 for the missing one.
        counts = [0] * (len(nums) + 1)
        for value in nums:
            counts[value] += 1
        # One sweep over the value range 1..n reads the counts back; every
        # other slot holds 1 and carries no information, so exactly one
        # duplicate and one gap are found.
        duplicate = missing = 0
        for value in range(1, len(nums) + 1):
            if counts[value] == 2:
                duplicate = value
            elif counts[value] == 0:
                missing = value
        return [duplicate, missing]
