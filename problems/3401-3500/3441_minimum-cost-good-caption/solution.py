class Solution:
    def minCostGoodCaption(self, caption: str) -> str:
        # Suffix DP over run states, then a greedy forward walk. The only
        # table kept is A[i][c]: the cheapest completion of positions i..n-1
        # given a CLOSED run (length >= 3) of character c just behind i.
        # A fresh run of ch planted at i consumes i, i+1, i+2 and re-enters
        # the closed state at i+3, so switching away from c costs the best
        # "triple(i, ch) + A[i+3][ch]" over ch != c — tracked as a top-2
        # pair so the exclusion of c itself stays O(1). The walk then takes
        # the smallest character at each position that keeps the remaining
        # budget exactly achievable, which yields the lexicographically
        # smallest optimal caption.
        n = len(caption)
        if n < 3:
            return ""
        src = [ord(ch) - 97 for ch in caption]
        INF = 1 << 30
        width = 26 * (n + 4)
        A = [INF] * width
        for c in range(26):
            A[26 * n + c] = 0
        m1 = [INF] * n
        j1 = [-1] * n
        m2 = [INF] * n
        j2 = [-1] * n
        for i in range(n - 1, -1, -1):
            si = src[i]
            row_next = 26 * (i + 1)
            if i + 3 <= n:
                s1 = src[i + 1]
                s2 = src[i + 2]
                row_triple = 26 * (i + 3)
                w = [abs(si - ch) + abs(s1 - ch) + abs(s2 - ch) + A[row_triple + ch] for ch in range(26)]
                best1 = best2 = INF
                idx1 = idx2 = -1
                for ch in range(26):
                    v = w[ch]
                    if v < best1:
                        best2, idx2 = best1, idx1
                        best1, idx1 = v, ch
                    elif v < best2:
                        best2, idx2 = v, ch
                m1[i], j1[i], m2[i], j2[i] = best1, idx1, best2, idx2
            else:
                w = None
                best1 = best2 = INF
                idx1 = idx2 = -1
            row = 26 * i
            if idx1 < 0:
                A[row : row + 26] = [abs(si - c) + A[row_next + c] for c in range(26)]
            else:
                A[row : row + 26] = [
                    min(
                        abs(si - c) + A[row_next + c],
                        best1 if idx1 != c else best2,
                    )
                    for c in range(26)
                ]
        # a fresh run must be planted at position 0
        budget = m1[0]
        out = []
        r, c = 0, -1  # trailing run length (0 only before the first char)
        for i in range(n):
            si = src[i]
            if r == 1:
                # a length-1 run must still reach length 3: needs i, i+1
                cand = abs(si - c) + abs(src[i + 1] - c) + A[26 * (i + 2) + c] if i + 2 <= n else INF
                chosen = c
            elif r == 2:
                cand = abs(si - c) + A[26 * (i + 1) + c]
                chosen = c
            else:
                # free choice: extend the closed run, or plant a fresh one
                ext = abs(si - c) + A[26 * (i + 1) + c] if r == 3 else INF
                pick, pick_val = 27, INF
                if m1[i] == budget and j1[i] != c:
                    pick, pick_val = j1[i], m1[i]
                elif m2[i] == budget and j2[i] != c:
                    pick, pick_val = j2[i], m2[i]
                if ext == budget and c < pick:
                    pick, pick_val = c, ext
                chosen = pick
                cand = pick_val
            # unreachable: every reachable state keeps a branch on budget
            if cand != budget:
                return ""
            out.append(chosen)
            budget -= abs(si - chosen)
            if r == 0 or (r == 3 and chosen != c):
                r, c = 1, chosen
            elif r < 3:
                r += 1
        return "".join(chr(97 + ch) for ch in out)
