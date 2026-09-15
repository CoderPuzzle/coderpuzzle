from typing import List


class Solution:
    def duplicateZeros(self, arr: List[int]) -> List[int]:
        # Two-pointer write from the end: every element is written to a
        # position at or to the right of its source, so no unread value is
        # ever overwritten. `i` reads the original array, `j` writes into
        # the extended one; writes with j beyond the real length fall off.
        n = len(arr)
        zeros = arr.count(0)
        i = n - 1
        j = n + zeros - 1
        while i >= 0:
            if j < n:
                arr[j] = arr[i]
            j -= 1
            if arr[i] == 0:
                if j < n:
                    arr[j] = 0
                j -= 1
            i -= 1
        return arr
