class Solution:
    def bitwiseComplement(self, n: int) -> int:
        # Grow a run of ones (1 -> 11 -> 111 -> ...) until it's at least as
        # wide as n's own binary representation; XOR-ing with that window
        # flips every bit n occupies and nothing above it. Starting the
        # window at a single bit means n = 0 falls straight through the
        # loop and returns 1 — the corner case the hint calls out.
        mask = 1
        while mask < n:
            mask = mask * 2 + 1
        return n ^ mask
