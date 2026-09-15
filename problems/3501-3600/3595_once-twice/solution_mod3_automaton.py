class Solution:
    def onceTwice(self, nums: list[int]) -> list[int]:
        # Bits of the thrice-repeated values cancel out of any per-bit count
        # taken modulo 3, so two 32-bit masks tracking each bit column's count
        # mod 3 — one for bits seen once, one for bits seen twice — hold the
        # two specials' unshared bits after a single sweep.
        ones = twos = 0
        for x in nums:
            u = x & 0xFFFFFFFF
            ones = (ones ^ u) & ~twos
            twos = (twos ^ u) & ~ones
        # A bit set in both specials is counted 1 + 2 = 3 times and appears in
        # neither mask, so the masks alone cannot finish the job: a bit where
        # the two values differ must split them apart.
        differ = ones | twos
        bit = differ & -differ
        # Triples never straddle that bit; one side holds the single, the other
        # the pair, each beside whole triples — the same automaton run per side
        # recovers each value in full, shared bits included.
        side_on_ones = side_on_twos = 0
        side_off_ones = side_off_twos = 0
        for x in nums:
            u = x & 0xFFFFFFFF
            if u & bit:
                side_on_ones = (side_on_ones ^ u) & ~side_on_twos
                side_on_twos = (side_on_twos ^ u) & ~side_on_ones
            else:
                side_off_ones = (side_off_ones ^ u) & ~side_off_twos
                side_off_twos = (side_off_twos ^ u) & ~side_off_ones
        # The side owning the differing bit holds the single exactly when the
        # ones mask owns it. Masks are unsigned; restore the sign bit at the end.
        if ones & bit:
            single, pair = side_on_ones, side_off_twos
        else:
            single, pair = side_off_ones, side_on_twos
        if single & 0x80000000:
            single -= 0x100000000
        if pair & 0x80000000:
            pair -= 0x100000000
        return [single, pair]
