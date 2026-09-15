from typing import List


class Solution:
    def minOperations(self, nums: List[int], target: int) -> int:
        # Bucket elements by their power-of-two exponent; two exponents span
        # at most [0, 30]. Sums reach 1000 * 2^30, so the running total stays
        # in Python's arbitrary precision integers.
        count = [0] * 62
        total = 0
        for num in nums:
            count[num.bit_length() - 1] += 1
            total += num
        # Every operation preserves the array sum, so a subsequence can never
        # exceed it.
        if total < target:
            return -1
        operations = 0
        for bit in range(31):
            if (target >> bit) & 1:
                if count[bit] > 0:
                    count[bit] -= 1
                else:
                    source = bit + 1
                    while count[source] == 0:
                        source += 1
                    # Unreachable given the total check; a defensive stop.
                    if source > 60:
                        return -1
                    operations += source - bit
                    count[source] -= 1
                    # The split chain banks one spare twin at every passed
                    # level and its own twin right at the needed level.
                    for spare in range(bit + 1, source):
                        count[spare] += 1
                    count[bit] += 1
            # Leftover pairs at this level stand in for the element one level
            # up, so they feed the next iteration for free.
            count[bit + 1] += count[bit] // 2
        return operations
