from typing import List, Optional


class Solution:
    def minKBitFlips(self, nums: List[int], k: int) -> int:
        n = len(nums)
        hint = [0] * n
        flips = 0
        # flip = parity of all flip windows still covering index i
        flip = 0
        for i in range(n):
            # fold in the flips whose windows end just before i
            flip ^= hint[i]
            # effective bit nums[i] ^ flip is 0: only a flip starting at i
            # can fix it, so the greedy choice is forced
            if (nums[i] ^ flip) == 0:
                # the forced window would run past the end: impossible
                if i + k > n:
                    return -1
                flips += 1
                flip ^= 1
                # pre-schedule this flip to stop applying after i + k - 1
                if i + k < n:
                    hint[i + k] ^= 1
        return flips
