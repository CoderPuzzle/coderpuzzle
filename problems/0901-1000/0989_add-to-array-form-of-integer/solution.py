from typing import List


class Solution:
    def addToArrayForm(self, num: List[int], k: int) -> List[int]:
        """`num` can hold 10⁴ digits, far past any fixed-width integer, so
        the addition runs schoolbook-style: right to left, one digit at a
        time, with `k` itself seeding the running carry.
        """
        carry = k
        result = []
        for digit in reversed(num):
            carry += digit
            result.append(carry % 10)
            carry //= 10
        # whatever of k outlives num keeps flowing out one digit at a time
        while carry:
            result.append(carry % 10)
            carry //= 10
        # digits were emitted least-significant first
        result.reverse()
        return result
