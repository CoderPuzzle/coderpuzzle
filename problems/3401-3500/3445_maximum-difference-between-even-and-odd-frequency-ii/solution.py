from typing import List, Optional


class Solution:
    def maxDifference(self, s: str, k: int) -> int:
        n = len(s)
        best = -(10**18)
        # Only digits '0'..'4' occur, so the 20 ordered pairs (a, b) with
        # a != b cover every candidate "freq[a] odd, freq[b] even" answer.
        for a in range(5):
            for b in range(5):
                if a == b:
                    continue
                # diff[i] = (#a - #b) among the first i chars; pa/pb are the
                # parities of those counts. A substring s[l..r-1] scores
                # diff[r] - diff[l]; it is valid iff pa flips and pb does not.
                diff = [0] * (n + 1)
                pa = [0] * (n + 1)
                pb = [0] * (n + 1)
                # last_b_at[r]: index of the last b inside the first r chars.
                # A left boundary l <= last_b_at[r] keeps at least one b in
                # the window (its count must be even but nonzero).
                last_b_at = [0] * (n + 1)
                last_b = -1
                for i in range(n):
                    d = ord(s[i]) - 48
                    diff[i + 1] = diff[i]
                    pa[i + 1] = pa[i]
                    pb[i + 1] = pb[i]
                    if d == a:
                        diff[i + 1] += 1
                        pa[i + 1] ^= 1
                    elif d == b:
                        diff[i + 1] -= 1
                        pb[i + 1] ^= 1
                        last_b = i
                    last_b_at[i + 1] = last_b
                INF = 10**18
                min_val = [[INF, INF], [INF, INF]]
                prev_bound = -1
                for r in range(1, n + 1):
                    lb = last_b_at[r]
                    if lb == -1:
                        bound = -1
                    else:
                        bound = min(r - k, lb)
                    if bound >= 0:
                        for l in range(prev_bound + 1, bound + 1):
                            v = diff[l]
                            if v < min_val[pa[l]][pb[l]]:
                                min_val[pa[l]][pb[l]] = v
                        prev_bound = bound
                        mv = min_val[pa[r] ^ 1][pb[r]]
                        if mv != INF:
                            cand = diff[r] - mv
                            if cand > best:
                                best = cand
        return best
