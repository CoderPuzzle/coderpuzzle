from typing import List


class Solution:
    def sortJumbled(self, mapping: List[int], nums: List[int]) -> List[int]:
        # Map each number once, then stable-sort by the mapped value so
        # equal keys keep their input order.
        def mapped(value: int) -> int:
            if value == 0:
                return mapping[0]
            digits = []
            while value:
                digits.append(mapping[value % 10])
                value //= 10
            out = 0
            for digit in reversed(digits):
                out = out * 10 + digit
            return out

        return sorted(nums, key=mapped)
