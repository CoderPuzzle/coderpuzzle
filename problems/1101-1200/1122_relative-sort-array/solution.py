from typing import List


class Solution:
    def relativeSortArray(self, arr1: List[int], arr2: List[int]) -> List[int]:
        # Rank in arr2 for present values; absent ones share the sentinel
        # rank len(arr2) and then compare by value, i.e. ascending at the end.
        rank = {value: index for index, value in enumerate(arr2)}
        tail = len(arr2)
        # Present values map to their rank (< tail <= 1000); absent ones map
        # to tail + value, which is >= tail and orders them by value.
        return sorted(arr1, key=lambda value: rank.get(value, tail + value))
