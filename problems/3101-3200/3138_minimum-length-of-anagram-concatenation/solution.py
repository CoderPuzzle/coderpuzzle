class Solution:
    def minAnagramLength(self, s: str) -> int:
        # t repeats, so len(t) = L divides n = len(s) and every n / L chunk
        # must carry the same letter multiset as the first chunk: sweep the
        # divisors of n ascending and take the first survivor. A running
        # count that exceeds the first chunk's count already proves the
        # chunk differs, so failed candidates die early.
        n = len(s)

        def works(length: int) -> bool:
            base = [0] * 26
            for ch in s[:length]:
                base[ord(ch) - 97] += 1
            run = [0] * 26
            filled = 0
            for ch in s:
                c = ord(ch) - 97
                run[c] += 1
                if run[c] > base[c]:
                    return False
                filled += 1
                if filled == length:
                    if run != base:
                        return False
                    run = [0] * 26
                    filled = 0
            return filled == 0

        for length in range(1, n + 1):
            if n % length == 0 and works(length):
                return length
        return n
