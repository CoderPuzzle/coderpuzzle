from typing import List, Optional

import heapq


class Solution:
    def minimumDifference(self, nums: List[int]) -> int:
        total = len(nums)
        n = total // 3

        # left_min[i] = sum of the n smallest values among nums[0..i] (valid when i >= n-1)
        left_min = [None] * total
        heap = []  # max-heap via negatives; keeps the n smallest so far
        running = 0
        for i, value in enumerate(nums):
            heapq.heappush(heap, -value)
            running += value
            if len(heap) > n:
                running += heapq.heappop(heap)  # drop the largest kept
            if len(heap) == n:
                left_min[i] = running

        # right_max[i] = sum of the n largest values among nums[i..] (valid when total - i >= n)
        right_max = [None] * total
        heap2 = []  # min-heap; keeps the n largest so far
        running2 = 0
        for i in range(total - 1, -1, -1):
            value = nums[i]
            heapq.heappush(heap2, value)
            running2 += value
            if len(heap2) > n:
                running2 -= heapq.heappop(heap2)  # drop the smallest kept
            if len(heap2) == n:
                right_max[i] = running2

        answer = None
        for i in range(n - 1, 2 * n):
            left = left_min[i]
            right = right_max[i + 1]
            if left is not None and right is not None:
                candidate = left - right
                if answer is None or candidate < answer:
                    answer = candidate
        return answer
