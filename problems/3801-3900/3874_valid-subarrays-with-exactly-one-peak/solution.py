from typing import List


class Solution:
    def validSubarrays(self, nums: List[int], k: int) -> int:
        # Each peak is the only peak in exactly those subarrays whose left
        # endpoint stays past the previous peak and whose right endpoint
        # stays before the next peak, both also within k of the peak. The
        # endpoint ranges multiply freely.
        n = len(nums)
        peaks = []
        for i in range(1, n - 1):
            if nums[i] > nums[i - 1] and nums[i] > nums[i + 1]:
                peaks.append(i)
        total = 0
        for idx, i in enumerate(peaks):
            prev = peaks[idx - 1] if idx > 0 else -1
            nxt = peaks[idx + 1] if idx + 1 < len(peaks) else n
            lo = max(i - k, prev + 1)
            hi = min(i + k, nxt - 1)
            total += (i - lo + 1) * (hi - i + 1)
        return total
