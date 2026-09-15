class Solution:
    def findComplement(self, num: int) -> int:
        # The flip lives inside num's leading-one window, so the tool to
        # build is the run of ones exactly that wide. Doubling a run of
        # ones and adding one extends it by one bit — 1 -> 11 -> 111 — so
        # mask is always 2^k - 1; stop at the first run that covers num.
        mask = 1
        while mask < num:
            mask = mask * 2 + 1
        # XOR with the all-ones window flips every bit num occupies and
        # nothing above it.
        return num ^ mask
