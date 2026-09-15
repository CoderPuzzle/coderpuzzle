class Solution:
    def minOperations(self, nums: List[int]) -> List[int]:
        # The definition, read literally: widen the offset d = 0, 1, 2, ...
        # and stop at the first d where either neighbor is a binary
        # palindrome; that first hit costs exactly d operations and no
        # palindrome can be closer.
        def distance(value: int) -> int:
            d = 0
            while True:
                # the down side floors at 1: values below have no binary
                # form without leading zeros
                if value - d >= 1 and palindrome(value - d):
                    return d
                if palindrome(value + d):
                    return d
                d += 1

        def palindrome(value: int) -> bool:
            bits = bin(value)[2:]
            left, right = 0, len(bits) - 1
            while left < right:
                if bits[left] != bits[right]:
                    return False
                left += 1
                right -= 1
            return True

        return [distance(v) for v in nums]
