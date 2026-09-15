class Solution:
    def findNumber(self, commonBits: CommonBits) -> int:
        # Query 0 first: it agrees wherever n is 0, counts every zero among
        # the low 30 bits, and leaves n untouched. For a single-bit probe
        # num = 2^i asked while n is whole, the answer is base + 1 when bit i
        # is set (probe agrees there too) and base - 1 when it is clear.
        # Every query flips that one bit of state, so each mask is asked
        # twice: XOR with the same num reverts the effect, restoring the
        # hidden number between probes.
        base = commonBits.commonBits(0)
        n = 0
        for i in range(30):
            if commonBits.commonBits(1 << i) > base:
                n |= 1 << i
            commonBits.commonBits(1 << i)
        return n
