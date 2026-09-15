from typing import List, Optional


class Solution:
    def getMaxFunctionValue(self, receiver: List[int], k: int) -> int:
        n = len(receiver)
        log = k.bit_length()
        up = [[0] * n for _ in range(log)]
        sm = [[0] * n for _ in range(log)]
        for x in range(n):
            up[0][x] = receiver[x]
            sm[0][x] = receiver[x]
        # Binary lifting: up[j][x] is the holder after 2^j passes from x,
        # sm[j][x] the sum of receivers during them. Each level composes two
        # half-jumps; the sum adds sm at x plus sm at the midpoint because
        # the second jump's receivers start where the first lands.
        for j in range(1, log):
            for x in range(n):
                mid = up[j - 1][x]
                up[j][x] = up[j - 1][mid]
                sm[j][x] = sm[j - 1][x] + sm[j - 1][mid]
        best = 0
        for x in range(n):
            # x itself counts in the score but appears in no receiving sum.
            # Decompose k into set bits: each set bit b contributes sm[b][cur]
            # and teleports cur, simulating k <= 1e10 passes in log k steps.
            total = x
            cur = x
            remaining = k
            bit = 0
            while remaining:
                if remaining & 1:
                    total += sm[bit][cur]
                    cur = up[bit][cur]
                remaining >>= 1
                bit += 1
            if total > best:
                best = total
        return best
