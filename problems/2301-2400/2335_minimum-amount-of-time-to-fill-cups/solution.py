from typing import List


class Solution:
    def fillCups(self, amount: List[int]) -> int:
        # Pair the two fullest types every second; a lone type is filled one
        # cup at a time. With counts sorted a <= b <= c that schedule ends in
        # max(c, ceil((a + b + c) / 2)) seconds: c because the largest type
        # can never lose more than one cup per second, ceil(total / 2) because
        # a second fills at most two cups, and the pairing schedule meets both
        # bounds at once.
        a, b, c = sorted(amount)
        total = a + b + c
        return max(c, (total + 1) // 2)
