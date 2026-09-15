class Solution:
    def numWaterBottles(self, numBottles: int, numExchange: int) -> int:
        # Every bottle is drunk exactly once, whether it started full or
        # was obtained by trading in empties. Track how many empties are
        # on hand and repeatedly trade in as many full groups as possible.
        drunk = numBottles
        empty = numBottles
        while empty >= numExchange:
            new_full = empty // numExchange
            empty = empty % numExchange + new_full
            drunk += new_full
        return drunk
