class Solution:
    def distMoney(self, money: int, children: int) -> int:
        # Seed every child with 1 dollar first; a child then lands on
        # exactly 8 iff it absorbs exactly 7 more. Peel whole children off
        # into eights from the top while the leftover change can still be
        # absorbed by the rest: it fails only when a single child must take
        # exactly 3 extra (a forbidden final 4) or nobody is left to take
        # any at all.
        if money < children:
            return -1
        rest = money - children
        k = min(rest // 7, children)
        while True:
            leftover = rest - 7 * k
            pool = children - k
            if (pool == 0 and leftover == 0) or (pool >= 1 and not (pool == 1 and leftover == 3)):
                return k
            k -= 1
