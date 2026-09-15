from typing import List


class Solution:
    def numFriendRequests(self, ages: List[int]) -> int:
        # Counting by age value: ages live in 1..120, so bucket every
        # person by age and judge each ordered pair of age values once.
        count = [0] * 121
        for age in ages:
            count[age] += 1
        total = 0
        for a in range(1, 121):
            if count[a] == 0:
                continue
            for b in range(1, 121):
                if count[b] == 0:
                    continue
                # x sends to y iff none of the three blocks holds; the
                # half-age test 2*b <= a + 14 is ages[y] <= 0.5*ages[x] + 7
                # in exact integer arithmetic.
                if 2 * b <= a + 14 or b > a or (b > 100 and a < 100):
                    continue
                # Same-age pairs cannot target oneself, so the diagonal
                # counts count*(count - 1), not count*count.
                total += count[a] * (count[b] - 1) if a == b else count[a] * count[b]
        return total
