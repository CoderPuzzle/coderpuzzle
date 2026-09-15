from typing import List, Optional

MOD = 10**9 + 7


class Solution:
    def countNumbers(self, l: str, r: str, b: int) -> int:
        def strip(s):
            t = s.lstrip("0")
            return t if t else "0"

        def to_base(s):
            s = strip(s)
            if s == "0":
                return [0]
            digits = []
            while s != "0":
                carry = 0
                ns = []
                for ch in s:
                    v = carry * 10 + (ord(ch) - 48)
                    ns.append(chr(48 + v // b))
                    carry = v % b
                digits.append(carry)
                s = strip("".join(ns))
            digits.reverse()
            return digits

        def count_up_to(s):
            digits = to_base(s)
            m = len(digits)
            # g[pos][last][tight][started]
            g = [[[[0] * 2 for _ in range(2)] for _ in range(b)] for _ in range(m + 1)]
            for last in range(b):
                for tight in range(2):
                    for started in range(2):
                        g[m][last][tight][started] = 1
            for pos in range(m - 1, -1, -1):
                for last in range(b):
                    for tight in range(2):
                        for started in range(2):
                            limit = digits[pos] if tight else b - 1
                            res = 0
                            for d in range(limit + 1):
                                nt = 1 if (tight and d == limit) else 0
                                if not started:
                                    if d == 0:
                                        res += g[pos + 1][0][nt][0]
                                    else:
                                        res += g[pos + 1][d][nt][1]
                                elif d >= last:
                                    res += g[pos + 1][d][nt][1]
                            g[pos][last][tight][started] = res % MOD
            return g[0][0][1][0]

        def dec(s):
            c = list(s)
            if all(ch == "0" for ch in c):
                return None
            i = len(c) - 1
            while i >= 0:
                if c[i] > "0":
                    c[i] = chr(ord(c[i]) - 1)
                    break
                c[i] = "9"
                i -= 1
            return strip("".join(c))

        dl = dec(l)
        below = count_up_to(dl) if dl is not None else 0
        return (count_up_to(r) - below) % MOD
