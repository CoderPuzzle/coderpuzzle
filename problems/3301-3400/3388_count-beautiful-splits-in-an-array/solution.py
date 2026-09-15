from array import array
from typing import List, Optional


class Solution:
    def beautifulSplits(self, nums: List[int]) -> int:
        n = len(nums)
        if n < 3:
            return 0
        # lcp[i][j] = longest common prefix of nums[i:] and nums[j:]
        lcp = [array("H", [0]) * (n + 1) for _ in range(n + 1)]
        for i in range(n - 1, -1, -1):
            row = lcp[i]
            next_row = lcp[i + 1]
            ni = nums[i]
            for j in range(n - 1, i, -1):
                if ni == nums[j]:
                    row[j] = next_row[j + 1] + 1

        count = 0
        for i in range(1, n - 1):  # i = end of nums1, start of nums2
            # Case A: nums1 is a prefix of nums2  => j >= 2*i and nums[0:i] == nums[i:2i]
            if lcp[0][i] >= i and 2 * i <= n - 1:
                count += n - 2 * i
                j_end = 2 * i
            else:
                j_end = n
            # Case B: nums2 is a prefix of nums3, counting only j not already covered by A
            for j in range(i + 1, j_end):
                L = j - i
                if lcp[i][j] >= L and n - j >= L:
                    count += 1
        return count
