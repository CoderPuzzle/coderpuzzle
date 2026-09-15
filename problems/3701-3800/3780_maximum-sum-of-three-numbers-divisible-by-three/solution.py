from typing import List


class Solution:
    def maximumSum(self, nums: List[int]) -> int:
        # Group values by remainder mod 3 and keep the three largest of
        # each group -- no valid triplet ever needs a group's fourth-largest
        # value. The only remainder patterns summing to 0 mod 3 are 000,
        # 111, 222, and 012, so at most nine values decide everything; the
        # answer is at most 3 * 10^5, safely inside 32 bits. If no pattern
        # is achievable the answer stays 0.
        top = [[], [], []]
        for v in nums:
            top[v % 3].append(v)
        for group in top:
            group.sort(reverse=True)
            del group[3:]

        def take(r, k):
            group = top[r]
            return sum(group[:k]) if len(group) >= k else -1

        best = 0
        for r in (0, 1, 2):
            total = take(r, 3)
            if total > best:
                best = total
        a, b, c = take(0, 1), take(1, 1), take(2, 1)
        if a >= 0 and b >= 0 and c >= 0 and a + b + c > best:
            best = a + b + c
        return best
