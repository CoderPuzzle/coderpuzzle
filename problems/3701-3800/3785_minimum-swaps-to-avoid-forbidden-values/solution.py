from collections import Counter
from typing import List


class Solution:
    def minSwaps(self, nums: List[int], forbidden: List[int]) -> int:
        # A swap repairs at most two bad positions, and two bad positions
        # sharing a value cannot repair each other, so the answer is at
        # least max(ceil(bad/2), worst same-value cluster). A value whose
        # combined count in nums and forbidden exceeds n has nowhere to
        # hide and makes the task impossible; otherwise both lower bounds
        # are achievable, and their max is the answer.
        n = len(nums)
        freq = Counter(nums)
        freq.update(forbidden)
        for count in freq.values():
            if count >= n + 1:
                return -1
        bad = Counter()
        for a, b in zip(nums, forbidden):
            if a == b:
                bad[a] += 1
        total = sum(bad.values())
        worst = max(bad.values(), default=0)
        return max((total + 1) // 2, worst)
