class Solution:
    def kthLuckyNumber(self, k: int) -> str:
        # Grow c until the blocks of all lengths up to c cover k: there are
        # 2**len lucky numbers of length len, cumulatively 2**(c + 1) - 2.
        c = 1
        while 2 ** (c + 1) - 2 < k:
            c += 1
        # Rank of k among the c-digit lucky numbers, made zero-based.
        x = k - (2**c - 2) - 1
        # Binary counting in order: pad x to c bits, map 0 -> 4 and 1 -> 7;
        # bit order mirrors digit order, so this enumerates the block exactly
        # as the statement sorts it.
        return "".join("7" if bit == "1" else "4" for bit in bin(x)[2:].zfill(c))
