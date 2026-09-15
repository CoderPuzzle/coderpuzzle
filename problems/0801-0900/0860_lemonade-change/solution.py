from typing import List


class Solution:
    def lemonadeChange(self, bills: List[int]) -> bool:
        # Only two counts ever matter: the $5 bills and the $10 bills on
        # hand. A $5 needs no change, a $10 consumes one $5, and a $20
        # consumes one $10 plus one $5 or three $5s. Handing the $10 first
        # is always at least as good: a $10 in the drawer is useful only as
        # part of a future $20's change, while a $5 serves every future
        # customer, so the choice that keeps the most $5s never hurts.
        fives = tens = 0
        for bill in bills:
            if bill == 5:
                fives += 1
            elif bill == 10:
                if fives == 0:
                    return False
                fives -= 1
                tens += 1
            elif tens >= 1 and fives >= 1:
                tens -= 1
                fives -= 1
            elif fives >= 3:
                fives -= 3
            else:
                return False
        return True
