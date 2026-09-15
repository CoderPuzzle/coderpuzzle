from collections import deque
from typing import List


class Solution:
    def primeSubarray(self, nums: List[int], k: int) -> int:
        # Sieve, then slide a window whose spread is taken over prime
        # values alone: two monotonic deques of prime positions expose the
        # window's min/max prime, and lo is the minimal left end whose
        # prime spread is <= k. Widening leftward only adds primes, so the
        # starts that keep the spread <= k form a suffix; starts that keep
        # at least two primes inside form a prefix ending at prev2, the
        # second-to-last prime position at or before the right end. The
        # two ranges intersect in [lo, prev2], and each start there yields
        # one balanced subarray ending here — add its length per right end.
        limit = max(nums)
        is_prime = [False, False] + [True] * (limit - 1)
        for value in range(2, int(limit**0.5) + 1):
            if is_prime[value]:
                for multiple in range(value * value, limit + 1, value):
                    is_prime[multiple] = False
        total = 0
        lo = 0
        prev1 = prev2 = -1  # last two prime positions at or before i
        mins = deque()  # prime positions, prime values increasing toward the back
        maxs = deque()  # prime positions, prime values decreasing toward the back
        for i, value in enumerate(nums):
            if is_prime[value]:
                while mins and nums[mins[-1]] >= value:
                    mins.pop()
                mins.append(i)
                while maxs and nums[maxs[-1]] <= value:
                    maxs.pop()
                maxs.append(i)
                prev2, prev1 = prev1, i
            if prev2 >= 0:
                while nums[maxs[0]] - nums[mins[0]] > k:
                    if mins[0] == lo:
                        mins.popleft()
                    if maxs[0] == lo:
                        maxs.popleft()
                    lo += 1
                if prev2 >= lo:
                    total += prev2 - lo + 1
        return total
