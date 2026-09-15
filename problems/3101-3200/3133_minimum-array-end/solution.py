class Solution:
    def minEnd(self, n: int, x: int) -> int:
        # Every element must contain every bit of x, so candidates are
        # exactly the supersets of x, ascending — their counter is spread
        # over the zero positions of x. The answer merges x with (n - 1):
        # walk bit slots upward, and push each successive bit of (n - 1)
        # into the next zero slot of x. Answers reach up to bit 52 (x <=
        # 10^8 leaves at least one of the low 27 bits free, so free-slot
        # rank r sits at position <= r + 26), hence 64-bit room.
        ans = x
        k = n - 1
        bit = 0
        while k:
            if not (ans >> bit) & 1:
                if k & 1:
                    ans |= 1 << bit
                k >>= 1
            bit += 1
        return ans
