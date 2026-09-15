from typing import List


class Solution:
    def singleNumber(self, nums: List[int]) -> List[int]:
        # XOR of the whole array: every value appearing twice cancels to
        # zero, so total is the XOR of exactly the two singles.
        total = 0
        for value in nums:
            total ^= value
        # total is nonzero (the singles are distinct); each set bit marks a
        # position where they differ. Isolate the lowest one: negation keeps
        # that bit and flips all lower bits, so the AND leaves exactly it.
        mask = total & -total
        # XOR only the values with that bit set. Duplicate pairs land in the
        # same group and cancel again; the singles differ at that bit, so
        # exactly one of them is here — leaving first as that single.
        first = 0
        for value in nums:
            if value & mask:
                first ^= value
        # total was the XOR of both singles, so the other falls out for free.
        second = total ^ first
        # Sorting only normalizes the output order.
        return sorted([first, second])
