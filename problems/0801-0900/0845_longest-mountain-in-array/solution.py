from typing import List


class Solution:
    def longestMountain(self, arr: List[int]) -> int:
        # One pass over the peaks: an index is a peak when it strictly
        # beats both neighbors; expand each slope while it stays strict.
        n = len(arr)
        best = 0
        i = 1
        while i < n - 1:
            if arr[i - 1] < arr[i] and arr[i] > arr[i + 1]:
                left = i - 1
                # Walk down the ascent while it keeps rising strictly.
                while left > 0 and arr[left - 1] < arr[left]:
                    left -= 1
                right = i + 1
                # Walk down the descent while it keeps falling strictly.
                while right < n - 1 and arr[right] > arr[right + 1]:
                    right += 1
                best = max(best, right - left + 1)
                # The next peak lies strictly past this descent's floor.
                i = right + 1
            else:
                i += 1
        return best
