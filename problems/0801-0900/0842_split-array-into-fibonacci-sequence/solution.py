from typing import List


class Solution:
    def splitIntoFibonacci(self, num: str) -> List[int]:
        # Only the first two pieces of a split are free — every later term is
        # the sum of the two before it — so a candidate split is nothing but
        # a pair of cuts. Try cut pairs shortest piece first (a term fits in
        # 32 bits, so ten digits cap each piece), follow the forced run under
        # each pair, and return the first sequence that consumes the string:
        # exactly the shortest-first split the statement pins.
        limit = 2**31 - 1
        n = len(num)
        for i in range(1, min(10, n - 2) + 1):
            if num[0] == "0" and i > 1:
                break
            a = int(num[:i])
            if a > limit:
                break
            for j in range(i + 1, min(i + 10, n - 1) + 1):
                if num[i] == "0" and j - i > 1:
                    break
                b = int(num[i:j])
                if b > limit:
                    break
                seq, pos, x, y = [a, b], j, a, b
                while pos < n:
                    z = x + y
                    if z > limit:
                        break
                    s = str(z)
                    if not num.startswith(s, pos):
                        break
                    seq.append(z)
                    pos += len(s)
                    x, y = y, z
                if pos == n:
                    return seq
        return []
