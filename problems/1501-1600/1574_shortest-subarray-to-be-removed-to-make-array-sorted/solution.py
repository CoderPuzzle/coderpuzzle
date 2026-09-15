from typing import List


class Solution:
    def findLengthOfShortestSubarray(self, arr: List[int]) -> int:
        n = len(arr)
        # Longest non-decreasing prefix: arr[0..left] is sorted.
        left = 0
        while left + 1 < n and arr[left] <= arr[left + 1]:
            left += 1
        if left == n - 1:
            return 0
        # Longest non-decreasing suffix: arr[right..n-1] is sorted.
        right = n - 1
        while right > 0 and arr[right - 1] <= arr[right]:
            right -= 1
        # Removing everything after the prefix, or everything before the
        # suffix, are always valid — they bound the answer from the start.
        result = min(n - left - 1, right)
        # Two-pointer merge: i walks the sorted prefix, j walks the sorted
        # suffix. Both prefix and suffix are individually non-decreasing, so
        # as i advances the smallest valid j never decreases — a classic
        # merge-step invariant, giving O(left + (n - right)) total work.
        i, j = 0, right
        while i <= left and j < n:
            if arr[i] <= arr[j]:
                # Keeping arr[0..i] and arr[j..n-1] merges into a sorted
                # array; everything strictly between them is removed.
                result = min(result, j - i - 1)
                i += 1
            else:
                j += 1
        return result
