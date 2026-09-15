from typing import List


class Solution:
    def minOperations(self, nums: List[int]) -> List[int]:
        # A binary palindrome is completely determined by its first half of
        # bits: mirror that half around the middle and the whole string is
        # fixed. So every candidate nearest palindrome is one of: the
        # mirrors of the value's own first half and the halves one step
        # below/above it, plus the two length-boundary forms.
        def distance(value: int) -> int:
            bits = bin(value)[2:]
            length = len(bits)
            half_len = (length + 1) // 2
            half = int(bits[:half_len], 2)
            best = None
            for head in (half - 1, half, half + 1):
                if head >> (half_len - 1) == 0:
                    continue  # would lose its leading one — not a b-bit head
                d = abs(value - mirror(head, half_len, length))
                if best is None or d < best:
                    best = d
            for boundary in ((1 << (length - 1)) - 1, (1 << length) + 1):
                d = abs(value - boundary)
                if best is None or d < best:
                    best = d
            return best

        def mirror(head: int, half_len: int, length: int) -> int:
            # Build the full palindrome from its first half of bits,
            # mirroring around the middle (dropping the shared center bit).
            high_bits = [(head >> i) & 1 for i in range(half_len - 1, -1, -1)]
            if length % 2 == 0:
                full = high_bits + high_bits[::-1]
            else:
                full = high_bits + high_bits[-2::-1]
            out = 0
            for bit in full:
                out = out * 2 + bit
            return out

        return [distance(v) for v in nums]
