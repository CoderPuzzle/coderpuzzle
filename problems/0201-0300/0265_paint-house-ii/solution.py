from typing import List


class Solution:
    def minCostII(self, costs: List[List[int]]) -> int:
        # Cheapest totals that leave the previous house painted each color,
        # compressed to the smallest, the second smallest, and the color
        # holding the smallest; a color may not extend its own ending.
        smallest, second, smallest_color = 0, 0, -1
        for cost in costs:
            # One pass over the row: every color takes the smallest previous
            # ending unless it IS the smallest's color, when only the second
            # smallest may legally be extended.
            next_smallest = next_second = 1 << 30
            next_color = -1
            for color, value in enumerate(cost):
                ending = value + (second if color == smallest_color else smallest)
                if ending < next_smallest:
                    next_second, next_smallest = next_smallest, ending
                    next_color = color
                elif ending < next_second:
                    next_second = ending
            smallest, second, smallest_color = next_smallest, next_second, next_color
        # The last house may end in any color, and the smallest ending is
        # already the cheapest of them.
        return smallest
