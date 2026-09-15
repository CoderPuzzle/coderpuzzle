from typing import List


class Solution:
    def largestMultipleOfThree(self, digits: List[int]) -> str:
        counts = [0] * 10
        total = 0
        for d in digits:
            counts[d] += 1
            total += d

        remainder = total % 3

        def drop(drop_count: int, cls: int) -> bool:
            nonlocal counts, remainder
            for d in (cls, cls + 3, cls + 6, cls + 9):
                if d > 9:
                    break
                take = min(counts[d], drop_count)
                counts[d] -= take
                drop_count -= take
                if drop_count == 0:
                    remainder = 0
                    return True
            return False

        if remainder == 1:
            if not drop(1, 1):
                drop(2, 2)
        elif remainder == 2:
            if not drop(1, 2):
                drop(2, 1)

        text = "".join(str(d) * counts[d] for d in range(9, -1, -1))
        if not text or text[0] == "0":
            return "0" if any(c != 0 for c in counts) else ""
        return text
