from collections import Counter
from typing import List


class Solution:
    def minSetSize(self, arr: List[int]) -> int:
        # A k-value set removes the sum of k frequencies; accumulate the
        # largest frequencies first until half the array is gone.
        counts = Counter(arr)
        need = (len(arr) + 1) // 2
        removed = 0
        for size, freq in enumerate(sorted(counts.values(), reverse=True), start=1):
            removed += freq
            if removed >= need:
                return size
        return len(counts)
