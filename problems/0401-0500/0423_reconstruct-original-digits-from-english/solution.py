from collections import Counter


class Solution:
    def originalDigits(self, s: str) -> str:
        # Order never matters: the input is a shuffled multiset of letters,
        # so one counting pass fixes every letter count there is to know.
        counts = Counter(s)
        # z, w, u, x and g each occur in exactly one digit word, so they
        # peel off 0, 2, 4, 6 and 8 with no bookkeeping at all.
        digits = [0] * 10
        digits[0] = counts["z"]
        digits[2] = counts["w"]
        digits[4] = counts["u"]
        digits[6] = counts["x"]
        digits[8] = counts["g"]
        # h, f and s are each shared with exactly one already-known digit
        # — 8, 4 and 6 respectively — so subtracting those yields 3, 5, 7.
        digits[3] = counts["h"] - digits[8]
        digits[5] = counts["f"] - digits[4]
        digits[7] = counts["s"] - digits[6]
        # o is shared with 0, 2 and 4; i with 5, 6 and 8. n is never
        # consulted: "nine" holds two of them against one apiece in "one"
        # and "seven", while its single i settles the count cleanly.
        digits[1] = counts["o"] - digits[0] - digits[2] - digits[4]
        digits[9] = counts["i"] - digits[5] - digits[6] - digits[8]
        # Ascending digits, each repeated as often as it was spelled.
        return "".join(str(d) * n for d, n in enumerate(digits))
