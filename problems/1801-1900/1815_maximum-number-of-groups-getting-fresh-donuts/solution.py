from typing import List, Tuple


class Solution:
    def maxHappyGroups(self, batchSize: int, groups: List[int]) -> int:
        # A group is happy when the donut count before it is 0 mod batchSize,
        # so the ordering matters only through remainders. Remainder-0 groups
        # are always happy, complementary remainders pair into zero-sum
        # blocks, and the memoized DP places what is left.
        k = batchSize
        freq = [0] * k
        for g in groups:
            freq[g % k] += 1
        ans = freq[0]
        freq[0] = 0
        i, j = 1, k - 1
        while i < j:
            m = min(freq[i], freq[j])
            ans += m
            freq[i] -= m
            freq[j] -= m
            i += 1
            j -= 1
        if i == j:
            ans += freq[i] // 2
            freq[i] %= 2

        memo = {}

        def dp(state: Tuple[int, ...], r: int) -> int:
            key = (state, r)
            if key in memo:
                return memo[key]
            best = 0
            for m in range(1, k):
                if state[m - 1]:
                    gain = 1 if r == 0 else 0
                    nxt = state[: m - 1] + (state[m - 1] - 1,) + state[m:]
                    cand = gain + dp(nxt, (r + m) % k)
                    if cand > best:
                        best = cand
            memo[key] = best
            return best

        return ans + dp(tuple(freq[1:]), 0)
