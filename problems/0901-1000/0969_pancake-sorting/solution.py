from typing import List


class Solution:
    def pancakeSort(self, arr: List[int]) -> List[int]:
        # The pinned answer is a selection sort from the largest value
        # down. For each size s, the unsorted prefix arr[:s] still holds
        # exactly the values 1..s, so the value to place is s itself —
        # already found by a scan in the other languages, found by index
        # here. One flip brings it to the front (skipped when it already
        # sits there), the flip with k = s carries it to index s-1, where
        # no later flip — all of which reverse a strictly shorter prefix —
        # can ever reach it again. At most two flips per size, so at most
        # 2*(n-1) in all, well inside the 10*n acceptance bound.
        a = list(arr)
        flips: List[int] = []
        for size in range(len(a), 1, -1):
            idx = a.index(size)
            if idx == size - 1:
                continue
            if idx != 0:
                flips.append(idx + 1)
                a[: idx + 1] = reversed(a[: idx + 1])
            flips.append(size)
            a[:size] = reversed(a[:size])
        return flips
