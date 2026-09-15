class Solution:
    def shiftDistance(self, s: str, t: str, nextCost: List[int], previousCost: List[int]) -> int:
        # Prefix sums over the two cyclic cost rings give every letter
        # pair's cheaper direction; the answer sums the per-index pair
        # costs. One pair costs at most 25 * 10^9 = 2.5*10^10 (64-bit
        # territory), but the total over s.length <= 10^5 stays at most
        # 2.5*10^15 < 2^53 ~= 9.0*10^15, so JS Numbers remain exact.
        pn = [0] * 27
        pp = [0] * 27
        for k in range(26):
            pn[k + 1] = pn[k] + nextCost[k]
            pp[k + 1] = pp[k] + previousCost[k]
        cost = [[0] * 26 for _ in range(26)]
        for a in range(26):
            for b in range(26):
                if a < b:
                    nxt = pn[b] - pn[a]
                elif a > b:
                    nxt = pn[26] - pn[a] + pn[b]
                else:
                    nxt = 0
                if b < a:
                    prv = pp[a + 1] - pp[b + 1]
                elif b > a:
                    prv = pp[26] - pp[b + 1] + pp[a + 1]
                else:
                    prv = 0
                cost[a][b] = min(nxt, prv)
        return sum(cost[ord(sc) - 97][ord(tc) - 97] for sc, tc in zip(s, t))
