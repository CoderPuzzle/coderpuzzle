class Solution:
    def findInteger(self, k: int, digit1: int, digit2: int) -> int:
        # The only numbers that can qualify are those whose decimal
        # representation uses just {digit1, digit2}; there are at most
        # 2 + 4 + ... + 2^10 = 2046 of them up to 10 digits (11-digit
        # values already exceed 2^31 - 1). Generate every one, sort the
        # list, and scan for the first value that is > k and divisible
        # by k. Sorting guarantees the smallest such value wins. A number
        # never starts with 0, so seed the generation with the nonzero
        # digits only.
        digits = sorted({digit1, digit2})
        cur = [d for d in digits if d != 0]
        cands = []
        for _ in range(10):  # lengths 1..10
            cands.extend(cur)
            nxt = []
            for v in cur:
                for d in digits:
                    nxt.append(v * 10 + d)
            cur = nxt
        cands.sort()
        for v in cands:
            if v > (1 << 31) - 1:
                break
            if v > k and v % k == 0:
                return v
        return -1
