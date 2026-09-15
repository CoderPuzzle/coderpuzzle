from typing import List


class Solution:
    def getPermutation(self, n: int, k: int) -> str:
        # Digits stay sorted, so the index computed below is the position of
        # the chosen digit among the digits still available.
        digits = [str(value) for value in range(1, n + 1)]
        # factorials[block] = block! — the size of one block at a position
        # with `block` positions still unfilled after it.
        factorials: List[int] = [1] * n
        for value in range(1, n):
            factorials[value] = factorials[value - 1] * value
        rank = k - 1
        result: List[str] = []
        for block in range(n - 1, -1, -1):
            # Quotient picks the digit, remainder is the rank inside its block.
            index, rank = divmod(rank, factorials[block])
            result.append(digits.pop(index))
        return "".join(result)
