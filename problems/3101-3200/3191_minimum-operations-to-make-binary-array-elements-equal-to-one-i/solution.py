from typing import List, Optional


class Solution:
    def minOperations(self, nums: List[int]) -> int:
        arr = list(nums)
        n = len(arr)
        operations = 0
        # The leftmost 0 can only be fixed by the one flip starting there, so
        # every position whose running value is 0 forces exactly one operation.
        for i in range(n - 2):
            if arr[i] == 0:
                operations += 1
                arr[i] ^= 1
                arr[i + 1] ^= 1
                arr[i + 2] ^= 1
        # The sweep leaves positions 0..n-3 all 1; the last two cells can no
        # longer be operated on, so any surviving 0 means the array is unfixable.
        if 0 in arr:
            return -1
        # Each counted flip was forced, so no cheaper sequence of flips exists.
        return operations
