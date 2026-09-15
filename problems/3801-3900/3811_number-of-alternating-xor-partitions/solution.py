from typing import List, Optional


class Solution:
    def alternatingXor(self, nums: List[int], target1: int, target2: int) -> int:
        # nums[i] and both targets are at most 1e5 < 2^17, and XOR never
        # widens a value, so every prefix XOR — and every bucket key
        # p ^ target — stays below 2^17.
        mod = 10**9 + 7
        # ends_t1[v] / ends_t2[v]: counts (mod p) of valid partitions of a
        # processed prefix whose last block XORs to target1 / target2, over
        # positions with prefix XOR v. Position 0 pre-loads the empty
        # start, ready to open a target1 block, on the target2 side.
        ends_t1 = [0] * (1 << 17)
        ends_t2 = [0] * (1 << 17)
        ends_t2[0] = 1
        p = 0
        cur_t1 = cur_t2 = 0
        for x in nums:
            # A target1 block ending here opens after a position whose
            # prefix XOR is p ^ target1, carrying a partition that ended on
            # target2 (or the empty start); symmetrically for target2.
            p ^= x
            cur_t1 = ends_t2[p ^ target1]
            cur_t2 = ends_t1[p ^ target2]
            ends_t1[p] = (ends_t1[p] + cur_t1) % mod
            ends_t2[p] = (ends_t2[p] + cur_t2) % mod
        # The alternation may stop after a target1 or a target2 block.
        return (cur_t1 + cur_t2) % mod
