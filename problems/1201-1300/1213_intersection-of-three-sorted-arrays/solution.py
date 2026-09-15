from typing import List


class Solution:
    def arraysIntersection(self, arr1: List[int], arr2: List[int], arr3: List[int]) -> List[int]:
        # One index per sorted array; the smallest current values can never
        # reappear ahead, so they are safe to step past.
        i = j = k = 0
        out = []
        while i < len(arr1) and j < len(arr2) and k < len(arr3):
            a, b, c = arr1[i], arr2[j], arr3[k]
            if a == b == c:
                out.append(a)
                i += 1
                j += 1
                k += 1
                continue
            smallest = min(a, b, c)
            if a == smallest:
                i += 1
            if b == smallest:
                j += 1
            if c == smallest:
                k += 1
        return out
