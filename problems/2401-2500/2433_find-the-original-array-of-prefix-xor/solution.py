from typing import List


class Solution:
    def findArray(self, pref: List[int]) -> List[int]:
        # arr[i] = pref[i] ^ pref[i-1] for every i (arr[0] = pref[0]), and
        # xor is its own inverse, so the original array falls out of one
        # linear difference pass. Written into a fresh output so the
        # caller's pref is never disturbed.
        arr = [pref[0]]
        for i in range(1, len(pref)):
            arr.append(pref[i] ^ pref[i - 1])
        return arr
