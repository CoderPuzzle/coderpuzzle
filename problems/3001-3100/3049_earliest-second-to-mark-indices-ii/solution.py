from typing import List, Optional
import heapq


class Solution:
    def earliestSecondToMarkIndices(self, nums: List[int], changeIndices: List[int]) -> int:
        n = len(nums)
        m = len(changeIndices)

        # first occurrence (0-indexed second) of each index whose nums value is > 0
        first = [-1] * n
        for i in range(m - 1, -1, -1):
            idx = changeIndices[i] - 1
            if nums[idx]:
                first[idx] = i

        total = sum(nums) + n

        def check(t):
            # Can all indices be marked within the first t seconds (0..t-1)?
            min_heap = []
            cnt = 0
            for i in range(t - 1, -1, -1):
                idx = changeIndices[i] - 1
                if i != first[idx]:
                    cnt += 1
                    continue
                heapq.heappush(min_heap, nums[idx])
                if cnt:
                    cnt -= 1
                else:
                    cnt += 1
                    heapq.heappop(min_heap)
            return total - (sum(min_heap) + len(min_heap)) <= cnt

        low = sum(1 if first[i] != -1 else nums[i] for i in range(n)) + n
        high = m
        while low <= high:
            mid = low + (high - low) // 2
            if check(mid):
                high = mid - 1
            else:
                low = mid + 1
        return low if low <= m else -1
