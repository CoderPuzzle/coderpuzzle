from typing import List


class Solution:
    def missingRolls(self, rolls: List[int], mean: int, n: int) -> List[int]:
        required = mean * (len(rolls) + n) - sum(rolls)
        if required < n or required > 6 * n:
            return []

        base, remainder = divmod(required, n)
        return [base + 1] * remainder + [base] * (n - remainder)
