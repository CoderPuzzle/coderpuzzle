from typing import List


class Solution:
    def maxTotalReward(self, rewardValues: List[int]) -> int:
        # Every legal play takes its rewards in strictly increasing value
        # order — the next value must exceed a running total that already
        # contains everything taken before it — and two copies of the
        # same value can never both be used. So after sorting, growing a
        # reachability bitset over achievable totals covers every play:
        # value v extends exactly from totals t < v. A wide integer makes
        # that filter one AND against the low-v-bit mask plus one shift;
        # fixed-width languages walk the same totals descending instead.
        # The final total is always below 2 * max(rewardValues) <= 4000,
        # so nothing here leaves 32-bit range.
        reach = 1
        for v in sorted(rewardValues):
            reach |= (reach & ((1 << v) - 1)) << v
        return reach.bit_length() - 1
