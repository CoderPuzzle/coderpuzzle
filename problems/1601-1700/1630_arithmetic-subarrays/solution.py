from typing import List, Optional


class Solution:
    def checkArithmeticSubarrays(self, nums: List[int], l: List[int], r: List[int]) -> List[bool]:
        answer = []
        for lo, hi in zip(l, r):
            # A set of numbers can be rearranged into an arithmetic
            # sequence exactly when its sorted order already is one.
            sub = sorted(nums[lo : hi + 1])
            diff = sub[1] - sub[0]
            ok = True
            for i in range(2, len(sub)):
                if sub[i] - sub[i - 1] != diff:
                    ok = False
                    break
            answer.append(ok)
        return answer
