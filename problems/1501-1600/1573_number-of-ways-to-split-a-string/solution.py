from typing import List, Optional

MOD = 10**9 + 7


class Solution:
    def numWays(self, s: str) -> int:
        # A split into three equal-ones parts only exists when the total
        # number of '1's is a multiple of 3. With `total == 0` every
        # character is '0', so any pair of the n - 1 gaps between
        # characters is a valid pair of cut points: C(n - 1, 2) ways.
        # Otherwise, record the positions of every '1'; the first cut may
        # land anywhere between the k-th and (k + 1)-th one (a run of
        # trailing zeros widens that window), and likewise the second cut
        # between the 2k-th and (2k + 1)-th one. The two windows never
        # overlap, so the answer is the product of their widths.
        n = len(s)
        ones_idx = [i for i, ch in enumerate(s) if ch == "1"]
        total = len(ones_idx)
        if total % 3 != 0:
            return 0
        if total == 0:
            return ((n - 1) * (n - 2) // 2) % MOD
        k = total // 3
        left = ones_idx[k] - ones_idx[k - 1]
        right = ones_idx[2 * k] - ones_idx[2 * k - 1]
        return (left * right) % MOD
