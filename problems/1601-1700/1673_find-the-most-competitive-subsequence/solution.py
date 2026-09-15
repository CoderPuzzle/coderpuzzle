from typing import List, Optional


class Solution:
    def mostCompetitive(self, nums: List[int], k: int) -> List[int]:
        # "Most competitive" is the lexicographically smallest length-k
        # subsequence — build it as a non-decreasing stack in one pass.
        stack = []
        n = len(nums)
        for i, value in enumerate(nums):
            remaining = n - i
            # Drop strictly larger tops while enough unread values remain to
            # refill to k; the strict > keeps the earlier of equal values,
            # which changes nothing lexicographically.
            while stack and stack[-1] > value and len(stack) + remaining > k:
                stack.pop()
            # Append only while there is room; a full stack can only change
            # through eviction above.
            if len(stack) < k:
                stack.append(value)
        return stack
