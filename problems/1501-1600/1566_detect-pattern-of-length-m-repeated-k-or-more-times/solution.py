from typing import List


class Solution:
    def containsPattern(self, arr: List[int], m: int, k: int) -> bool:
        n = len(arr)
        # Not even one m-length block can repeat k times if there isn't
        # room for m * k elements.
        if n < m * k:
            return False
        need = m * (k - 1)
        run = 0
        # arr[i] == arr[i - m] means position i continues whatever block
        # started m slots earlier; run counts how many positions in a row
        # have done that. Once run reaches m * (k - 1) the block ending
        # just before this run has repeated k times back to back.
        for i in range(m, n):
            if arr[i] == arr[i - m]:
                run += 1
                if run == need:
                    return True
            else:
                run = 0
        return False
