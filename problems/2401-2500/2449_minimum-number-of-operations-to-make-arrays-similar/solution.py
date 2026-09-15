from typing import List


class Solution:
    def makeSimilar(self, nums: List[int], target: List[int]) -> int:
        # Every move is +-2, so an element's parity never changes and the
        # even/odd classes evolve independently in size. Within a class,
        # matching sorted positions smallest-to-smallest (hints 2-3) never
        # wastes work: any crossing assignment can be uncrossed without
        # raising the total rise. Each operation supplies exactly one +2,
        # so the answer is the total positive rise divided by 2 — the
        # drops are free riders on the same operations.
        evens = sorted(x for x in nums if x % 2 == 0)
        odds = sorted(x for x in nums if x % 2 != 0)
        tevens = sorted(x for x in target if x % 2 == 0)
        todds = sorted(x for x in target if x % 2 != 0)
        ops = 0
        for a, b in zip(evens, tevens):
            if b > a:
                ops += (b - a) // 2
        for a, b in zip(odds, todds):
            if b > a:
                ops += (b - a) // 2
        return ops
