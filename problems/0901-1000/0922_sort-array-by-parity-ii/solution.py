from typing import List


class Solution:
    def sortArrayByParityII(self, nums: List[int]) -> List[int]:
        # The judge pins one exact answer: the even values sorted ascending
        # fill the even indices, and the odd values sorted ascending fill the
        # odd indices. One scan splits the values by parity, one sort orders
        # each group, and the two slices deal them into the answer — values
        # are compared only inside their own parity group.
        evens = sorted(value for value in nums if value % 2 == 0)
        odds = sorted(value for value in nums if value % 2 != 0)
        answer = [0] * len(nums)
        answer[::2] = evens
        answer[1::2] = odds
        return answer
