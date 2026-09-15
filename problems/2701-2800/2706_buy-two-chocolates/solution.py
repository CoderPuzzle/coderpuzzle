from typing import List


class Solution:
    def buyChoco(self, prices: List[int], money: int) -> int:
        # The cheapest pair is the two smallest prices; one pass tracks
        # them without sorting.
        first = second = 101
        for price in prices:
            if price < first:
                first, second = price, first
            elif price < second:
                second = price
        if first + second > money:
            return money
        return money - first - second
