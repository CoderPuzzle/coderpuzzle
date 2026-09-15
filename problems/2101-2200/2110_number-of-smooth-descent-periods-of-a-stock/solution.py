class Solution:
    def getDescentPeriods(self, prices: list[int]) -> int:
        run = 0
        total = 0
        previous = None
        for price in prices:
            if previous is not None and previous - price == 1:
                run += 1
            else:
                run = 1
            total += run
            previous = price
        return total
