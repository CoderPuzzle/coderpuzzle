from typing import List


class Solution:
    def numOfSubarrays(self, arr: List[int], k: int, threshold: int) -> int:
        # window_sum >= k * threshold is the exact integer form of
        # "average >= threshold"; the window updates in O(1) per slide.
        need = k * threshold
        window = sum(arr[:k])
        count = 1 if window >= need else 0
        for i in range(k, len(arr)):
            window += arr[i] - arr[i - k]
            if window >= need:
                count += 1
        return count
