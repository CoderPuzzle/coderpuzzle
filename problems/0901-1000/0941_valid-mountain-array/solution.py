from typing import List


class Solution:
    def validMountainArray(self, arr: List[int]) -> bool:
        # Walk up while strictly increasing: where the climb stops is the
        # only candidate peak the array can offer.
        n = len(arr)
        i = 0
        while i + 1 < n and arr[i] < arr[i + 1]:
            i += 1
        # The peak must be interior: a climb that never started leaves i at
        # 0, and one that consumed the whole array parks the peak on the
        # last element.
        if i == 0 or i == n - 1:
            return False
        # Walk down while strictly decreasing; a valid mountain must land
        # exactly on the last index (an equal neighbor stops it early).
        while i + 1 < n and arr[i] > arr[i + 1]:
            i += 1
        return i == n - 1
