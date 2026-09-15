from typing import List


class Solution:
    def validPartition(self, nums: List[int]) -> bool:
        # ok[i] = the prefix nums[:i] has a valid partition. Its last block
        # is one of the three good shapes ending at i, and the rest must
        # partition validly — a pure function of ok[i-2] / ok[i-3].
        n = len(nums)
        ok = [False] * (n + 1)
        ok[0] = True
        for i in range(2, n + 1):
            if nums[i - 1] == nums[i - 2]:
                ok[i] = ok[i] or ok[i - 2]
            if i >= 3:
                if nums[i - 1] == nums[i - 2] == nums[i - 3]:
                    ok[i] = ok[i] or ok[i - 3]
                elif nums[i - 2] - nums[i - 3] == 1 and nums[i - 1] - nums[i - 2] == 1:
                    ok[i] = ok[i] or ok[i - 3]
        return ok[n]
