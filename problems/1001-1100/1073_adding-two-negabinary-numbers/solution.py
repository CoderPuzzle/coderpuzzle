from typing import List


class Solution:
    def addNegabinary(self, arr1: List[int], arr2: List[int]) -> List[int]:
        # Walk both arrays from the least-significant digit (the end)
        # toward the most-significant, keeping a running carry. At each
        # column, total = d1 + d2 + carry can temporarily fall outside
        # {0, 1} (it even goes negative), so the digit and the next
        # carry are pulled out with bitwise ops instead of a sign-prone
        # mod/div: total & 1 is the digit, because in two's-complement
        # form the low bit of total already equals total's floor-mod-2
        # regardless of sign. The next carry is -(total >> 1), where
        # >> is an arithmetic (floor) shift, matching the base -2
        # identity total = digit + (-2) * carry. The carry provably
        # stays within {-1, 0, 1} the whole way, so nothing overflows.
        i, j = len(arr1) - 1, len(arr2) - 1
        carry = 0
        digits = []
        while i >= 0 or j >= 0 or carry != 0:
            d1 = arr1[i] if i >= 0 else 0
            d2 = arr2[j] if j >= 0 else 0
            total = d1 + d2 + carry
            digits.append(total & 1)
            carry = -(total >> 1)
            i -= 1
            j -= 1
        digits.reverse()
        k = 0
        while k < len(digits) - 1 and digits[k] == 0:
            k += 1
        return digits[k:]
