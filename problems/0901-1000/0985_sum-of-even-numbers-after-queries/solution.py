from typing import List


class Solution:
    def sumEvenAfterQueries(self, nums: List[int], queries: List[List[int]]) -> List[int]:
        """Every query rewrites exactly one element, so the even sum can
        only change through that element: carry it as a running total —
        subtract the old value when it is even, apply the addition, add the
        new value when it is even — and record the total once per query.
        """
        running = sum(value for value in nums if value % 2 == 0)
        answer = []
        for val, index in queries:
            old = nums[index]
            # the old value leaves the total before the addition lands, so a
            # value that flips parity is never counted on both sides
            if old % 2 == 0:
                running -= old
            new = old + val
            nums[index] = new
            # % 2 == 0 is the sign-safe evenness test: -2 passes it in every
            # language, whatever remainder -3 happens to yield
            if new % 2 == 0:
                running += new
            answer.append(running)
        return answer
