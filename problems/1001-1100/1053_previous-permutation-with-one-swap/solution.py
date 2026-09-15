from typing import List


class Solution:
    def prevPermOpt1(self, arr: List[int]) -> List[int]:
        n = len(arr)
        # Rightmost index i with arr[i] > arr[i + 1]: everything after it
        # is already non-decreasing, so i is the latest position whose
        # value can still be lowered by a single swap.
        i = -1
        for k in range(n - 2, -1, -1):
            if arr[k] > arr[k + 1]:
                i = k
                break
        if i == -1:
            return arr
        # Track the largest value strictly less than arr[i]; scanning
        # left to right and updating only on a strictly larger candidate
        # keeps the leftmost occurrence of that maximum among ties, which
        # is what maximizes the resulting array.
        j = -1
        best = -1
        for k in range(i + 1, n):
            if arr[k] < arr[i] and arr[k] > best:
                best = arr[k]
                j = k
        arr[i], arr[j] = arr[j], arr[i]
        return arr
