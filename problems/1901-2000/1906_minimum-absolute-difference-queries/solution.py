from array import array
from itertools import accumulate
from typing import List, Optional


class Solution:
    def minDifference(self, nums: List[int], queries: List[List[int]]) -> List[int]:
        # With values capped at 100, a value is either present in a range
        # or not, and 100 prefix-count rows decide that in O(1): row v
        # holds the occurrence count of v over every prefix of nums, so v
        # appears in nums[l..r] exactly when its count rises between l
        # and r+1. A query then walks the value axis 1..100, collects
        # the values whose counts rise, and takes the smallest gap
        # between consecutive ones — present values arrive in increasing
        # order, and the minimum |a[i] - a[j]| over a set always sits
        # between value-adjacent elements. Fewer than two rising rows
        # means every element in the range matches, so the answer is -1;
        # with two or more the gap is at most 99, which is what makes
        # the untouched sentinel honest. The rows are built in one
        # C-level accumulate pass each and stored as 4-byte array
        # cells, keeping the 100 x (n+1) table at ~40 MB and the whole
        # scan O(100 * (n + q)) — comfortably 32-bit throughout.
        n = len(nums)
        pre = [array("i", accumulate(map(v.__eq__, nums), initial=0)) for v in range(1, 101)]
        answer = []
        for left, right in queries:
            r1 = right + 1
            prev = -1
            best = 100
            for idx in range(100):
                row = pre[idx]
                if row[r1] != row[left]:
                    v = idx + 1
                    if prev >= 0 and v - prev < best:
                        best = v - prev
                    prev = v
            answer.append(best if best < 100 else -1)
        return answer
