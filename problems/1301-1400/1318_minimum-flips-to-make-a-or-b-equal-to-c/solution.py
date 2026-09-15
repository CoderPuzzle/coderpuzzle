class Solution:
    def minFlips(self, a: int, b: int, c: int) -> int:
        # Per-bit accounting: c-bit 1 needs a|b == 1 (one flip when both are
        # 0); c-bit 0 needs a|b == 0 (one flip per set bit among a and b).
        flips = 0
        while a or b or c:
            if c & 1:
                if not (a & 1) and not (b & 1):
                    flips += 1
            else:
                flips += (a & 1) + (b & 1)
            a >>= 1
            b >>= 1
            c >>= 1
        return flips
