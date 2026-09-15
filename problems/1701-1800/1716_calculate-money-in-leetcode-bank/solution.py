from typing import List, Optional


class Solution:
    def totalMoney(self, n: int) -> int:
        # Split n into w full weeks and r trailing days. Week k (counting
        # from 0) deposits (k+1) + (k+2) + ... + (k+7), seven amounts rising
        # from k+1, which sums to 7*(k+1) + 21; the w complete weeks thus
        # contribute 7*w*(w+1)//2 + 21*w. The r leftover days of the next
        # week deposit (w+1) + ... + (w+r) = r*w + r*(r+1)//2.
        w, r = divmod(n, 7)
        return 7 * w * (w + 1) // 2 + 21 * w + r * w + r * (r + 1) // 2
