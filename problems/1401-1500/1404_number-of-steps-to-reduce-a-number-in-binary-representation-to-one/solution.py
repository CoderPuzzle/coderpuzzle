from typing import List, Optional


class Solution:
    def numSteps(self, s: str) -> int:
        steps = 0
        carry = 0
        # Consume bits from the least significant end. An even digit takes
        # one step (divide by two); an odd digit takes two (add one, then
        # divide). The carry records the overflow pushed left by adding 1.
        for i in range(len(s) - 1, 0, -1):
            digit = (1 if s[i] == "1" else 0) + carry
            if digit % 2 == 0:
                steps += 1
                carry = digit // 2
            else:
                steps += 2
                carry = (digit + 1) // 2
        # Only the leading '1' is left; a pending carry makes it "10",
        # needing one final divide-by-two.
        return steps + carry
