from typing import List


class Solution:
    def medianSlidingWindow(self, nums: List[int], k: int) -> List[float]:
        from bisect import bisect_left, insort

        # One sorted list mirrors the window: binary insertion keeps it
        # sorted without ever re-sorting a whole window.
        window = []
        out = []
        for i, x in enumerate(nums):
            insort(window, x)
            # Evict the leftmost occurrence of the outgoing value — equal
            # elements are interchangeable, so the multiset stays exact.
            if i >= k:
                window.pop(bisect_left(window, nums[i - k]))
            # Eviction already ran, so exactly k values are present here;
            # the median is then a plain index lookup (middle pair for
            # even k, averaged as a float).
            if i >= k - 1:
                if k & 1:
                    out.append(float(window[k // 2]))
                else:
                    out.append((window[k // 2 - 1] + window[k // 2]) / 2.0)
        return out
