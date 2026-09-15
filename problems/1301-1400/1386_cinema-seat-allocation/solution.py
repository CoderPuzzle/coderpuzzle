from typing import List


class Solution:
    def maxNumberOfFamilies(self, n: int, reservedSeats: List[List[int]]) -> int:
        LEFT = 0b0000011110  # seats 2-5
        RIGHT = 0b0111100000  # seats 6-9
        MIDDLE = 0b0001111000  # seats 4-7
        masks = {}
        for row, seat in reservedSeats:
            masks[row] = masks.get(row, 0) | (1 << (seat - 1))
        groups = 2 * (n - len(masks))
        for mask in masks.values():
            if mask & (LEFT | RIGHT) == 0:
                groups += 2
            elif mask & LEFT == 0 or mask & MIDDLE == 0 or mask & RIGHT == 0:
                groups += 1
        return groups
