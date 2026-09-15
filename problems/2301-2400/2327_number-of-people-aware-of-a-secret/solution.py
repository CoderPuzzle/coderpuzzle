from typing import List, Optional


class Solution:
    def peopleAwareOfSecret(self, n: int, delay: int, forget: int) -> int:
        MOD = 10**9 + 7
        # know[d] = number of people who first learn the secret on day d;
        # day 1 seeds the whole cascade
        know = [0] * (n + 1)
        know[1] = 1
        for day in range(2, n + 1):
            total = 0
            # sharers still active on `day` are those who learned on some d
            # with d + delay <= day <= d + forget - 1: the window
            # [day - forget + 1, day - delay], clamped at 1 (nobody earlier)
            for d in range(max(1, day - forget + 1), day - delay + 1):
                total += know[d]
            know[day] = total % MOD
        # aware at the end of day n = learned within the last forget - 1
        # days; earlier learners have forgotten
        return sum(know[n - forget + 1 : n + 1]) % MOD
