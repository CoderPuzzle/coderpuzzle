from typing import List, Optional


class Solution:
    def maximumXor(self, s: str, t: str) -> str:
        n = len(s)
        s_ones = s.count("1")
        t_ones = t.count("1")
        # Ones of t that can land on s's '0' positions and zeros of t that
        # can land on s's '1' positions — the largest pair of opposite-bit
        # counts the two multisets allow, maxed together.
        ones_on_zeros = min(t_ones, n - s_ones)
        zeros_on_ones = min(n - t_ones, s_ones)
        # Greedy left-to-right fill: spend an opposite bit at each position
        # while its class still has one, which pushes every achievable XOR
        # one as far left as it can go.
        out = []
        for ch in s:
            if ch == "0":
                if ones_on_zeros:
                    out.append("1")
                    ones_on_zeros -= 1
                else:
                    out.append("0")
            else:
                if zeros_on_ones:
                    out.append("1")
                    zeros_on_ones -= 1
                else:
                    out.append("0")
        return "".join(out)
